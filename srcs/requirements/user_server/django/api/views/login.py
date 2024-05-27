
import requests
import os

from django.http import JsonResponse
from django.views.generic import RedirectView
from django.core.files.base import ContentFile
from django.conf import settings

from rest_framework_simplejwt.tokens import RefreshToken

from ..models import User, OTPModel
from ._serializer import UserSerializer

from django.core.mail import send_mail

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
RETURN_URI = 'http://localhost:8000/api/login/done/'


class login_to_42(RedirectView):
	url = f'https://api.intra.42.fr/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={RETURN_URI}&response_type=code'


def after_login(request):
	access_token = get_access_token(request.GET['code'])
	user = get_user_info(access_token)
	save_user_info(user)
	make_otp_code(user)
	jwt_token = make_jwt_token(user)

	return JsonResponse(jwt_token, safe=False)



def get_access_token(code):

	url = 'https://api.intra.42.fr/oauth/token'

	body = {
		'grant_type': 'authorization_code',
		'client_id': f'{CLIENT_ID}',
		'client_secret': f'{CLIENT_SECRET}',
		'code': f'{code}',
		'redirect_uri': f'{RETURN_URI}',
	}

	response = requests.post(url, json=body)

	return response.json()['access_token']


def save_user_info(data):

	name = data['login']
	email = data['email']
	img_url = data['image']['link']

	user = User.objects.filter(name=name)

	if not user:
		response = requests.get(img_url)
		avatar = response.content

		user_instance = User(name=name, email=email)
		user_instance.avatar.save(f"{name}.jpg", ContentFile(avatar))
		user_instance.save()


def get_user_info(access_token):

	url = 'https://api.intra.42.fr/v2/me'

	header = {
		'Authorization': f'Bearer {access_token}'
	}

	response = requests.get(url, headers=header)

	return response.json()


def make_otp_code(data):

	user = User.objects.get(name=data['login'])

	user_otp, tmp = OTPModel.objects.get_or_create(user=user)
	user_otp.save()

	# send_mail(
	# 	"ft_transcendence OTP",
	# 	f'''your OTP code is
	# 	{user_otp.code}
	# 	input in 5 minute''',
	# 	"tkdwjd4512@gmail.coms", 
	# 	[user.email]
	# )


def make_jwt_token(data):

	jwt_token = requests.post("http://localhost:8000/api/token/", json={"name": data['login'],}).json()

	tmp = {
		"token": jwt_token['token'],
		"refresh": jwt_token['refresh'],
	}

	return tmp
