import os
import cv2
import numpy as np
import insightface
import datetime
from imutils.video import VideoStream
from collections import defaultdict

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
        prev_face_size = None  # Track the size of the previous face
        results = defaultdict(int)
        last_frame = None

        # Adjust these thresholds as needed
        STRICT_THRESHOLD = 80
        RELAXED_THRESHOLD = 30

        while True:
            try:
                frame = video_stream.read()
                last_frame = frame
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
                    distances = np.linalg.norm(self.known_face_encodings - embedding, axis=1)
                    best_match_index = np.argmin(distances)

                    # Determine current face size
                    current_face_size = (face.bbox[2] - face.bbox[0]) * (face.bbox[3] - face.bbox[1])

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

                    results[name] += 1

        return results, last_frame

if __name__ == "__main__":
    root_dir = "media"
    camera_urls = ["rtsp://admin:Z12345678r@192.168.0.201/Streaming/channels/2/"]

    face_detector = FaceDetector(root_dir)
    face_detector.add_camera(camera_urls)

    results = defaultdict(int)
    last_frame = None

    for video_stream in face_detector.video_captures:
        stream_results, frame = face_detector.detect_and_display_faces(video_stream)
        results.update(stream_results)
        last_frame = frame  # Save the last frame

    # Determine the most frequent face detected
    most_frequent_name = max(results, key=results.get)
    print(f"The most frequent face detected is: {most_frequent_name}")

    # Save the last frame to disk
    if last_frame is not None:
        cv2.imwrite("last_frame.jpg", last_frame)
