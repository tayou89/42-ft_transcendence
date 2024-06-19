from django.db import models
from user.models import User

class MatchHistory(models.Model):
	p1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='p1')
	p2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='p2')
	p1_score = models.PositiveIntegerField()
	p2_score = models.PositiveIntegerField()
	date = models.DateTimeField(auto_now_add=True)

	class Meta:
		indexes = [
			models.Index(fields=['p1']),
			models.Index(fields=['p2']),
		]


# Create your models here.
