import cv2
import insightface
import numpy as np


def main():
    # Initialize the webcam
    cap = cv2.VideoCapture(
        "rtsp://admin:Z12345678r@192.168.0.201/Streaming/channels/2/"
    )

    # Check if the camera opened successfully
    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    # Load InsightFace model and set it to GPU mode
    face_detector = insightface.app.FaceAnalysis()
    face_detector.prepare(ctx_id=0)  # 0 indicates the GPU id

    while True:
        # Read a frame from the camera
        ret, frame = cap.read()

        if not ret:
            print("Error: Could not read frame.")
            break

        # Analyze the face, which includes detection
        faces = face_detector.get(frame)

        for face in faces:
            bbox = face.bbox.astype(np.int32).flatten()
            print("Detected face at: ", bbox)


if __name__ == "__main__":
    main()
