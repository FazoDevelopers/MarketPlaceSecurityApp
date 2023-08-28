import os
import datetime
import cv2
import numpy as np
import torch
import insightface
import faiss
from imutils.video import VideoStream

from flask import Flask, Response
import json

app = Flask(__name__)


class FaceDetector:
    def __init__(self, root_dir):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        try:
            self.face_model = insightface.app.FaceAnalysis()
            ctx_id = 0
            self.face_model.prepare(ctx_id=ctx_id)
        except Exception as e:
            print(f"Ошибка при инициализации моделей: {e}")
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
        for video_capture in self.video_captures:
            for result in self.detect_and_display_faces(video_capture):
                yield result

    def load_face_encodings(self, root_dir):
        known_face_encodings = []
        known_face_names = []
        if "media" not in os.listdir(os.getcwd()):
            os.makedirs("media")

        print(f"Processing root directory: {root_dir}")
        print("The dir: ", os.getcwd())
        for dir_name in os.listdir(root_dir):
            print(root_dir)
            dir_path = os.path.join(root_dir, dir_name)
            if os.path.isdir(dir_path):
                print(f"Processing directory: {dir_path}")
                for file_name in os.listdir(dir_path):
                    if file_name.endswith(".jpg") or file_name.endswith(".png"):
                        image_path = os.path.join(dir_path, file_name)
                        print(f"Processing image: {image_path}")
                        try:
                            image = cv2.imread(image_path)
                            if image is None:
                                print(f"Unable to read image: {image_path}")
                                continue

                            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                            faces = self.face_model.get(image)
                            if not faces:
                                print(f"No faces detected in image: {image_path}")
                                continue

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
            raise ValueError(
                "No face encodings loaded. Please ensure valid images are present."
            )

        index = faiss.IndexFlatL2(known_face_encodings.shape[1])
        index.add(known_face_encodings)

        return index, known_face_names

    def detect_and_display_faces(self, video_stream):
        names = []
        results_list = []
        screenshot_interval = 0.3
        last_screenshot_time = datetime.datetime.now()
        last_yield_time = datetime.datetime.now()

        while True:
            current_time = datetime.datetime.now()

            try:
                frame = video_stream.read()
                if frame is None:
                    print("Unable to read frame")
                    continue
            except Exception as e:
                print(f"Unable to read frame: {e}")
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
                    box = face.bbox.astype(int)
                    face_image = frame[box[1] : box[3], box[0] : box[2]]
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
                    embedding = face.embedding

                    D, I = self.index.search(embedding.reshape(1, -1), 1)
                    if D[0, 0] < 600:
                        name = self.known_face_names[I[0, 0]]
                        names.append(name)
                        # results_list.append(
                        #     {
                        #         "time": str(datetime.datetime.now()).split(".")[0],
                        #         "user_id": name
                        #     }
                        # )
                        yield {"user": name}
            if (
                current_time - last_screenshot_time
            ).total_seconds() > screenshot_interval:
                screenshot_filename = os.path.join(
                    "./wanted",
                    f"screenshot_{current_time.strftime('%Y%m%d%H%M%S')}.jpg",
                )
                cv2.imwrite(screenshot_filename, frame)
                last_screenshot_time = current_time
            # if (current_time - last_yield_time).total_seconds() > 2:
                # if results_list:
                #     most_common_result = max(results_list, key=results_list.count)
                #     yield most_common_result
                #     results_list.clear()
                #     last_yield_time = current_time


# root_dir = os.getcwd() + "/media"
root_dir = "/home/ocean/Projects/MarketSecurityApp/media"
detector = FaceDetector(root_dir=root_dir)
camera_urls = ["rtsp://admin:Z12345678r@192.168.0.201/Streaming/channels/2/"]
detector.add_camera(camera_urls)


@app.route("/camera", methods=["GET"])
def print_results():
    def generator():
        for result in detector.start_all_video_captures():
            print(result)
            yield json.dumps(result)

    return Response(generator(), mimetype="text/event-stream")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=11223)



# write full full full updated code, rewrite unchanged parts as well, do you even understand whatta fuck is "full"???? it means "Write full updated code, without missing any letter of the code"
# if chat gpt doesnt write full updated code
