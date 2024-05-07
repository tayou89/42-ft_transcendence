from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

import random

class UserManager(BaseUserManager):
	def create_user(self, name, email, **extra_field):
		if not name:
			raise ValueError('name must be set')
		
		if not email:
			raise ValueError('email must be set')
		
		email = self.normalize_email(email)
		user = self.model(name=name, email=email, **extra_field)
		user.save(using=self._db)
		return user

class User(AbstractBaseUser, PermissionsMixin):

	name = models.CharField(max_length=50, unique=True, blank=False)
	email = models.EmailField(unique=True, blank=False, null=False, default="example@student.42seoul.kr")
	avatar = models.ImageField(upload_to='avatars/', blank=True, default='avatars/default.jpg')

	wins = models.IntegerField(default=0)
	losses = models.IntegerField(default=0)
	friends = models.ManyToManyField('self', symmetrical=False, blank=True, related_name="friend_set", related_query_name="friend")

	password = None
	last_login = None
	is_superuser = None
	groups = None
	user_permissions = None

	USERNAME_FIELD = 'name'
	REQUIRED_FIELDS = ['email']

	objects = UserManager()
	

class MatchHistory(models.Model):
	left = models.ForeignKey(User, on_delete=models.CASCADE, related_name='left')
	right = models.ForeignKey(User, on_delete=models.CASCADE, related_name='right')
	left_score = models.PositiveIntegerField()
	right_score = models.PositiveIntegerField()
	date = models.DateTimeField(auto_now_add=True)

	class Meta:
		indexes = [
			models.Index(fields=['left']),
			models.Index(fields=['right']),
		]

class OTPModel(models.Model):
	code = models.CharField(max_length=6)
	created_at = models.DateTimeField(auto_now_add=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)

	def save(self):
		key_set = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		self.code = ''.join(random.choice(key_set) for _ in range(6))
		super().save()


# Create your models here.
