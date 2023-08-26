import cv2

# Open the RTSP stream
rtsp_url = "rtsp://admin:Z12345678r@192.168.0.201/Streaming/channels/2/"
cap = cv2.VideoCapture(rtsp_url)

while True:
    ret, frame = cap.read()
    print(frame, ret)
#     if not ret:
#         break
    
#     cv2.imshow('Webcam Stream', cv2.WINDOW_NORMAL)
    
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()
