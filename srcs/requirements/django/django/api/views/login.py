
import requests

from django.http import JsonResponse
from django.views.generic import RedirectView
from django.core.files.base import ContentFile
from django.conf import settings

from rest_framework_simplejwt.tokens import RefreshToken

from ..models import User, OTPModel
from ._serializer import UserSerializer

from django.core.mail import send_mail

CLIENT_ID = 'u-s4t2ud-8d12d7e6fababe2523d2a20d8990cf9142c12f67f168d57875c2a6c04d8a92c6'
CLIENT_SECRET = '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'
RETURN_URI = 'http://localhost:8000/api/loginin/'

class loginTo42(RedirectView):
	url = f'https://api.intra.42.fr/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={RETURN_URI}&response_type=code'


def saveUserToDB(data):

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


def getUserInfo(token):

	url = 'https://api.intra.42.fr/v2/me'

	header = {
		'Authorization': f'Bearer {token}'
	}

	response = requests.get(url, headers=header)
	saveUserToDB(response.json())
	
	user = User.objects.get(name=response.json()['login'])

	try:
		user_otp = OTPModel.objects.get(user=user)
	except OTPModel.DoesNotExist:
		user_otp = OTPModel(user=user)

	user_otp.save()

	# send_mail(
	# 	"ft_transcendence OTP",
	# 	f'''your OTP code is
	# 	{user_otp.code}
	# 	input in 5 minute''',
	# 	"tkdwjd4512@gmail.coms", 
	# 	[user.email]
	# )

	jwt_token = requests.post("http://localhost:8000/api/token/", json={"name": user.name,}).json()

	body = {
		"token": jwt_token['token'],
		"refresh": jwt_token['refresh'],
		"redirect_url": "http://localhost:8000/hi/"
	}

	return body


def main(request):

	code = request.GET['code']

	url = 'https://api.intra.42.fr/oauth/token'

	body = {
		'grant_type': 'authorization_code',
		'client_id': f'{CLIENT_ID}',
		'client_secret': f'{CLIENT_SECRET}',
		'code': f'{code}',
		'redirect_uri': f'{RETURN_URI}',
	}

	response = requests.post(url, json=body)

	token = response.json()['access_token']

	return JsonResponse(getUserInfo(token), safe=False)
