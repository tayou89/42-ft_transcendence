from django.db import models
from rest_framework import serializers

class Room(models.Model):
	name = models.CharField(max_length=100, unique=True, default="1vs1 여고생 빨무 초보만")

	p1 = models.PositiveIntegerField()
	p2 = models.PositiveIntegerField()
	p3 = models.PositiveIntegerField(default=None)
	p4 = models.PositiveIntegerField(default=None)
 
	in_game = models.BooleanField(default=False)
	is_mtt = models.BooleanField(default=False)

	max_users = models.PositiveIntegerField(default=2)
	cur_users = models.PositiveIntegerField(default=0)
 
	def save(self, *args, **kwargs):
		self.max_users = 4 if self.is_mtt else 2
		super().save(*args, **kwargs)
		
		

class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = '__all__'

# Create your models here.
