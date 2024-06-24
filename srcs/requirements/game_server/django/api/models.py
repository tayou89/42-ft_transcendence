from django.db import models
from rest_framework import serializers

class Room(models.Model):
	name = models.CharField(max_length=100, unique=True, blank=False)

	p1 = models.PositiveIntegerField(null=True)
	p2 = models.PositiveIntegerField(null=True)
	p3 = models.PositiveIntegerField(null=True)
	p4 = models.PositiveIntegerField(null=True)
 
	in_game = models.BooleanField(default=False)
	mtt = models.BooleanField(default=False, blank=False)

	max_users = models.PositiveIntegerField(default=2)
	cur_users = models.PositiveIntegerField(default=0)
 
	def save(self, *args, **kwargs):
		self.max_users = 4 if self.mtt else 2
		super().save(*args, **kwargs)
		
		

class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = '__all__'

# Create your models here.
