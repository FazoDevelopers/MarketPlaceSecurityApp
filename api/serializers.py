from rest_framework import serializers

from api.models import Camera


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = ["name", "url", "longitude", "latitude"]
