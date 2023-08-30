from django.urls import path

from api.views import CameraAPIView

urlpatterns = [
    path(
        "", CameraAPIView.as_view({"get": "list", "post": "create"}), name="camera-list"
    ),
    path(
        "<int:pk>/",
        CameraAPIView.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
        name="camera-detail",
    ),
]
