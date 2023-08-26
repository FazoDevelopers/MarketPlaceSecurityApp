import os
import cv2
import numpy as np
import insightface
import datetime
from imutils.video import VideoStream
import time
from collections import Counter


class FaceDetector:
    def __init__(self, root_dir):
        try:
            self.face_model = insightface.app.FaceAnalysis()
            ctx_id = 0
            self.face_model.prepare(ctx_id=ctx_id)
        except Exception as e:
            print(f"Error initializing models: {e}")
            raise

        try:
            self.known_face_encodings, self.known_face_names = self.load_face_encodings(
                root_dir
            )
        except Exception as e:
            print(f"Error loading face encodings: {e}")
            raise

        self.video_captures = []

    def add_camera(self, urls):
        for url in urls:
            print(f"Adding cameras: {urls}")
            try:
                video_stream = VideoStream(url).start()
                self.video_captures.append(video_stream)
                print(f"Video capture for {url} opened successfully")
            except Exception as e:
                print(f"Error opening video capture for {url}: {e}")
                continue

    def load_face_encodings(self, root_dir):
        known_face_encodings = []
        known_face_names = []

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
                        except Exception as e:
                            print(f"Unable to process image {image_path}: {e}")
                            continue

                        if faces:
                            face = faces[0]
                            embedding = face.embedding
                            known_face_encodings.append(embedding)
                            known_face_names.append(dir_name)

        return known_face_encodings, known_face_names

    def detect_and_display_faces(self, video_stream):
        prev_face_size = None  # Track the size of the previous face

        # Adjust these thresholds as needed
        STRICT_THRESHOLD = 80
        RELAXED_THRESHOLD = 30

        result_counter = Counter()
        start_time = time.time()

        while True:
            elapsed_time = time.time() - start_time
            if elapsed_time >= 2:  # 2 seconds have passed
                most_common_result = result_counter.most_common(1)
                if most_common_result:
                    cv2.imwrite("/wanted/" + str(datetime.datetime.now()) + ".jpg", frame)
                    print(most_common_result[0])
                start_time = time.time()  # reset the start time
                result_counter.clear()  # reset the counter

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

                    result = {
                        "time": str(datetime.datetime.now()).split(".")[0],
                        "user_id": name,
                    }
                    result_counter[name] += 1


if __name__ == "__main__":
    root_dir = "media"
    camera_urls = ["rtsp://admin:Z12345678r@192.168.0.201/Streaming/channels/2/"]

    face_detector = FaceDetector(root_dir)
    face_detector.add_camera(camera_urls)

    for video_stream in face_detector.video_captures:
        for face_data in face_detector.detect_and_display_faces(video_stream):
            print(face_data)
