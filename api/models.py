from django.db import models


class Camera(models.Model):
    name = models.CharField(max_length=150, null=False, unique=True, blank=False)
    url = models.CharField(max_length=150, unique=True, null=False, blank=False)
    longitude = models.FloatField(null=False, blank=False, unique=True)
    latitude = models.FloatField(null=False, blank=False, unique=True)
