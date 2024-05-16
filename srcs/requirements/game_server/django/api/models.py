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


HEIGHT = 300
WIDTH = 400

class GameState:

	def __init__(self, x, y):
		self.left_paddle = 0
		self.right_paddle = 0
		self.ball_position = (x, y)
		self.ball_velocity = (1, 1)
		self.left_score = 0
		self.right_score = 0

	def update_ball(self):
		x, y = self.ball_position
		dx, dy = self.ball_velocity

		if y >= HEIGHT or y <= -HEIGHT:
			dy = -dy
		
		if x >= WIDTH:
			if abs(self.right_paddle - y) < 50:
				dx = -dx
			else:
				x, y = 0, 0
				self.right_score += 1
		
		if x <= -WIDTH:
			if abs(self.left_paddle - y) < 50:
				dx = -dx
			else:
				x, y = 0, 0
				self.left_score += 1

		self.ball_position = (x + dx, y + dy)
		self.ball_velocity = (dx, dy)

	def update_paddle(self, paddle, position):
		if paddle == 'left':
			self.left_paddle = position
		elif paddle == 'right':
			self.right_paddle = position
# Create your models here.
