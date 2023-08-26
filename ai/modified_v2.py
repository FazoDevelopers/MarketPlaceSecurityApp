import os
import datetime
import cv2
import numpy as np
import torch
import tensorflow as tf
import insightface
import faiss

import threading
from imutils.video import VideoStream


class FaceDetector:
    def __init__(self, root_dir, model_weights):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        try:
            self.face_model = insightface.app.FaceAnalysis()
            ctx_id = 0
            self.face_model.prepare(ctx_id=ctx_id)
        except Exception as e:
            print(f"Ошибка при инициализации моделей: {e}")
            raise

        self.emotion_labels = [
            "jahldorlik",
            "behuzur",
            "xavotir",
            "xursandchilik",
            "gamgin",
            "xayron",
            "neytral",
        ]
        self.emotion_model = self.create_emotion_model()
        try:
            self.emotion_model.load_weights(model_weights)
        except Exception as e:
            print(f"Не удалось загрузить веса модели: {e}")
            raise

        try:
            self.index, self.known_face_names = self.load_face_encodings(root_dir)
        except Exception as e:
            print(f"Ошибка при загрузке кодировок лиц: {e}")
            raise

        self.emotion = ""
        self.user_id = ""
        self.video_captures = []

    def add_camera(self, urls):
        for url in urls:
            print(f"Adding cameras: {urls}")
            try:
                video_stream = VideoStream(url).start()
                self.video_captures.append(video_stream)
                print(f"Захват видео для {url} открыт успешно")
            except Exception as e:
                print(f"Ошибка при открытии видеозахвата для {url}: {e}")
                continue

    def start_all_video_captures(self):
        if self.index is None:
            print("Face detection aborted due to lack of encodings.")
            return []
        threads = []
        for video_capture in self.video_captures:
            try:
                thread = threading.Thread(
                    target=self.detect_and_display_faces, args=(video_capture,)
                )
                thread.start()
                threads.append(thread)
            except Exception as e:
                print(f"Ошибка при создании потока: {e}")

        for thread in threads:
            try:
                thread.join()
            except Exception as e:
                print(f"Ошибка при ожидании завершения потока: {e}")

    def create_emotion_model(self):
        try:
            gpus = tf.config.experimental.list_physical_devices("GPU")
            if gpus:
                tf.config.experimental.set_visible_devices(gpus[0], "GPU")
                logical_gpus = tf.config.experimental.list_logical_devices("GPU")
                print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
        except RuntimeError as e:
            print(f"Ошибка при настройке GPU: {e}")

        emotion_model = tf.keras.models.Sequential()
        emotion_model.add(
            tf.keras.layers.Conv2D(
                64, (5, 5), activation="relu", input_shape=(48, 48, 1)
            )
        )
        emotion_model.add(
            tf.keras.layers.MaxPooling2D(pool_size=(5, 5), strides=(2, 2))
        )
        emotion_model.add(tf.keras.layers.Conv2D(64, (3, 3), activation="relu"))
        emotion_model.add(tf.keras.layers.Conv2D(64, (3, 3), activation="relu"))
        emotion_model.add(
            tf.keras.layers.AveragePooling2D(pool_size=(3, 3), strides=(2, 2))
        )
        emotion_model.add(tf.keras.layers.Conv2D(128, (3, 3), activation="relu"))
        emotion_model.add(tf.keras.layers.Conv2D(128, (3, 3), activation="relu"))
        emotion_model.add(
            tf.keras.layers.AveragePooling2D(pool_size=(3, 3), strides=(2, 2))
        )
        emotion_model.add(tf.keras.layers.Flatten())
        emotion_model.add(tf.keras.layers.Dense(1024, activation="relu"))
        emotion_model.add(tf.keras.layers.Dropout(0.2))
        emotion_model.add(tf.keras.layers.Dense(1024, activation="relu"))
        emotion_model.add(tf.keras.layers.Dropout(0.2))
        emotion_model.add(tf.keras.layers.Dense(7, activation="softmax"))
        return emotion_model

    def load_face_encodings(self, root_dir):
        known_face_encodings = []
        known_face_names = []
        if "media" not in os.listdir(os.getcwd()):
            os.makedirs("media")
        for dir_name in os.listdir(root_dir):
            dir_path = os.path.join(root_dir, dir_name)
            if os.path.isdir(dir_path):
                for file_name in os.listdir(dir_path):
                    if file_name.endswith(".jpg") or file_name.endswith(".png"):
                        image_path = os.path.join(dir_path, file_name)
                        try:
                            image = cv2.imread(image_path)
                            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                            faces = self.face_model.get(image)
                            if faces:
                                face = faces[0]
                                box = face.bbox.astype(int)
                                face_image = image[box[1] : box[3], box[0] : box[2]]
                                if face_image.size == 0:
                                    continue
                                face_image = cv2.resize(face_image, (640, 480))
                                face_image = face_image / 255.0
                                face_image = (
                                    torch.tensor(face_image.transpose((2, 0, 1)))
                                    .float()
                                    .to(self.device)
                                    .unsqueeze(0)
                                )
                                embedding = np.array(face.embedding)
                                known_face_encodings.append(embedding)
                                known_face_names.append(dir_name)
                        except Exception as e:
                            print(f"Unable to process image {image_path}: {e}")
                            continue

        known_face_encodings = np.array(known_face_encodings)
        print("Known face encodings shape:", known_face_encodings.shape)
        if known_face_encodings.shape[0] == 0:
            print("No valid face encodings found.")
            return None, []
        index = faiss.IndexFlatL2(known_face_encodings.shape[1])
        index.add(known_face_encodings)

        return index, known_face_names

    def detect_and_display_faces(self, video_stream):
        prev_face_size = None  # Track the size of the previous face

        # Adjust these thresholds as needed
        STRICT_THRESHOLD = 50
        RELAXED_THRESHOLD = 10

        while True:
            try:
                frame = video_stream.read()
                if frame is None:
                    # If unable to read frame, skip to the next iteration
                    continue
            except Exception as e:
                print(f"Error while reading frame: {e}")
                continue

            try:
                faces = self.face_model.get(frame)
                if faces is None:
                    print("Model could not process frame")
                    continue
            except Exception as e:
                print(f"Error in face recognition: {e}")
                continue

            if faces:
                for face in faces:
                    embedding = face.embedding
                    distances = np.linalg.norm(
                        self.known_face_encodings - embedding, axis=1
                    )
                    best_match_index = np.argmin(distances)

                    # Determine current face size
                    current_face_size = (face.bbox[2] - face.bbox[0]) * (
                        face.bbox[3] - face.bbox[1]
                    )

                    # Decide which threshold to use based on face size
                    if prev_face_size and current_face_size < 0.7 * prev_face_size:
                        threshold = RELAXED_THRESHOLD
                    else:
                        threshold = STRICT_THRESHOLD

                    # Update previous face size
                    prev_face_size = current_face_size

                    if distances[best_match_index] < threshold:
                        name = self.known_face_names[best_match_index]
                    else:
                        name = "Unknown"

                    yield {
                        "time": str(datetime.datetime.now()).split(".")[0],
                        "user_id": name,
                    }
            else:
                yield {
                    "time": str(datetime.datetime.now()).split(".")[0],
                    "user_id": "No face detected",
                }


root_dir = "/media"
detector = FaceDetector(root_dir=root_dir, model_weights="./model.h5")
camera_urls = ["rtsp://admin:Z12345678r@192.168.0.201/Streaming/channels/2/"]
detector.add_camera(camera_urls)


def print_results():
    for result in detector.start_all_video_captures():
        print(result)


if __name__ == "__main__":
    print_results()
