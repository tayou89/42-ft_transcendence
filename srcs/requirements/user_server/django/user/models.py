from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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
	display_name = models.CharField(max_length=50, default="")
	introduce = models.CharField(max_length=200, default="")
	email = models.EmailField(unique=True, blank=False, null=False, default="example@student.42seoul.kr")
	avatar = models.ImageField(upload_to='avatars/', blank=True, default='avatars/default.jpg')

	wins = models.IntegerField(default=0)
	losses = models.IntegerField(default=0)
	friends = models.ManyToManyField('self', symmetrical=False, blank=True, related_name="friend_set", related_query_name="friend")

	exp = models.PositiveBigIntegerField(default=0)
	online = models.BooleanField(default=False)

	password = None
	last_login = None
	is_superuser = None
	groups = None
	user_permissions = None

	USERNAME_FIELD = 'name'
	REQUIRED_FIELDS = ['email']

	objects = UserManager()
 
	def save(self, *args, **kwargs):
		self.display_name = self.name
		super().save(*args, **kwargs)