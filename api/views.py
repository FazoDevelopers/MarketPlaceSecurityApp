from rest_framework.viewsets import ModelViewSet

from api.models import Camera, Criminals
from api.serializers import CameraSerializer, CriminalsSerializer
from api.filters import CameraFilter, CriminalsFilter
from api.pagination import CameraPagination, CriminalsPagination


class CameraAPIView(ModelViewSet):
    model = Camera
    serializer_class = CameraSerializer
    queryset = Camera.objects.all().order_by("name")
    lookup_field = "pk"
    filterset_class = CameraFilter
    pagination_class = CameraPagination


class CriminalsAPIView(ModelViewSet):
    model = Criminals
    serializer_class = CriminalsSerializer
    queryset = Criminals.objects.all()
    lookup_field = "pk"
    filterset_class = CriminalsFilter
    pagination_class = CriminalsPagination
