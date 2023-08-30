from rest_framework.viewsets import ModelViewSet

from api.models import Camera
from api.serializers import CameraSerializer
from api.filters import CameraFilter


class CameraAPIView(ModelViewSet):
    model = Camera
    serializer_class = CameraSerializer
    queryset = Camera.objects.all().order_by("name")
    lookup_field = "pk"
    filterset_class = CameraFilter
