from django.db import models
from rest_framework import serializers

class Room(models.Model):
	name = models.CharField(max_length=100, unique=True)
	max_users = models.PositiveIntegerField(default=2)
	cur_users = models.PositiveIntegerField(default=0)

class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = '__all__'

# Create your models here.
