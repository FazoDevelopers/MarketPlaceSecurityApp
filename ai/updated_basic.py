import cv2
import os
import numpy as np


class BaseApp:
    def __init__(self, url):
        self.url = url
        self.cap = cv2.VideoCapture(self.url)

    def is_opened(self):
        return self.cap.isOpened()

    def read_frame(self):
        ret, frame = self.cap.read()
        return ret, frame

    def release(self):
        self.cap.release()


face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


def train_face_recognizer(media_folder_path):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    labels = []
    training_images = []
    label_to_name_map = {}
    for filename in os.listdir(media_folder_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            image_path = os.path.join(media_folder_path, filename)
            image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
            faces = face_cascade.detectMultiScale(image, 1.1, 4)
            for x, y, w, h in faces:
                face_region = image[y : y + h, x : x + w]
                training_images.append(face_region)
                label = len(label_to_name_map)
                labels.append(label)
                label_to_name_map[label] = filename.rsplit(".", 1)[0]
    recognizer.train(training_images, np.array(labels))
    return recognizer, label_to_name_map


class FaceRecognitionVideoPlayer:
    def __init__(self, video_streamer, media_folder_path):
        self.video_streamer = video_streamer
        self.recognizer, self.label_to_name_map = train_face_recognizer(
            media_folder_path
        )

    def recognize_face(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        for x, y, w, h in faces:
            face_region = gray[y : y + h, x : x + w]
            label, confidence = self.recognizer.predict(face_region)
            if confidence < 100:
                name = self.label_to_name_map.get(label, "Unknown")
                cv2.putText(
                    frame,
                    name,
                    (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9,
                    (36, 255, 12),
                    2,
                )
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        return frame

    def play(self):
        while True:
            ret, frame = self.video_streamer.read_frame()
            if not ret:
                print("Can't receive frame. Exiting ...")
                break
            frame_with_faces = self.recognize_face(frame)
            cv2.imshow("Video", frame_with_faces)
            if cv2.waitKey(1) == ord("q"):
                break

    def close(self):
        cv2.destroyAllWindows()
        self.video_streamer.release()


def main():
    cuda_enabled = cv2.cuda.getCudaEnabledDeviceCount() > 0
    if cuda_enabled:
        print("OpenCV was built with CUDA support!")
    else:
        print("OpenCV was not built with CUDA support.")
    video_streamer = BaseApp("http://192.168.0.162:12345/video_feed")
    if not video_streamer.is_opened():
        print("Failed to open video stream.")
        return
    media_folder_path = "./media"
    video_player = FaceRecognitionVideoPlayer(video_streamer, media_folder_path)
    video_player.play()
    video_player.close()


if __name__ == "__main__":
    main()
