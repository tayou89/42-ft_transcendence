
from ..models import User
from ._serializer import UserSerializer

from django.core.cache import cache

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


class MyRefreshToken(TokenRefreshView):
	def post(self, request, *args, **kwargs):
		refresh_token = request.COOKIES.get('refresh')
		
		request.data["refresh"] = refresh_token
		response = super().post(request, *args, **kwargs)
		token = response.data["access"]
		response.data = None
		response.set_cookie('jwt', token, httponly=True)
		response.status_code = 204
		return response


class log_out(APIView):
	def post(self, request):

		jwt_token = AccessToken(request.COOKIES.get('jwt'))
		user = User.objects.get(id=jwt_token.payload.get('user_id'))
		user.online = False
		user.save()

		refresh_token = request.COOKIES.get('refresh')
		if refresh_token:
			refresh = RefreshToken(refresh_token)
			refresh.blacklist()
		response = Response(status=status.HTTP_204_NO_CONTENT)
		response.delete_cookie('jwt')
		response.delete_cookie('refresh')
  