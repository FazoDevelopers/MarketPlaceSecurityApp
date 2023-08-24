import os
import cv2
import numpy as np
import insightface
import datetime
from imutils.video import VideoStream


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
            self.known_face_encodings, self.known_face_names = self.load_face_encodings(root_dir)
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
        while True:
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
                    embedding = face.embedding
                    distances = np.linalg.norm(self.known_face_encodings - embedding, axis=1)
                    best_match_index = np.argmin(distances)
                    
                    if distances[best_match_index] < 600:
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


if __name__ == "__main__":
    root_dir = "media"
    camera_urls = ["http://192.168.0.162:12345/video_feed"]

    face_detector = FaceDetector(root_dir)
    face_detector.add_camera(camera_urls)

    for video_stream in face_detector.video_captures:
        for face_data in face_detector.detect_and_display_faces(video_stream):
            print(face_data)
