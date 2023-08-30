import django_filters

from api.models import Camera


class CameraFilter(django_filters.FilterSet):
    class Meta:
        model = Camera
        fields = ["name", "longitude", "latitude", "id"]
