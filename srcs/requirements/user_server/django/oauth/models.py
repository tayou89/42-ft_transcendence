from django.db import models
from user.models import User
import random

class OTPModel(models.Model):
	code = models.CharField(max_length=6)
	created_at = models.DateTimeField(auto_now_add=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
 
	class Meta:
		indexes = [
			models.Index(fields=['user'])
		]

	def save(self, *args, **kwargs):
		key_set = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		self.code = ''.join(random.choice(key_set) for _ in range(6))
		super().save()


# Create your models here.
