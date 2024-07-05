
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from user.models import User

class withdraw(APIView):
	def post(self, request):
		jwt_token = request.COOKIES.get('jwt')
		if jwt_token is None:
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		jwt_token = AccessToken(jwt_token)
		
		user = User.objects.get(id=jwt_token.payload.get('user_id'))
		user.delete()
  
		response = Response(status=status.HTTP_200_OK)
		response.delete_cookie('jwt')
		response.delete_cookie('refresh')
		return response
    


class log_out(APIView):
	def post(self, request):
		jwt_token = request.COOKIES.get('jwt')
		if not jwt_token:
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		jwt_token = AccessToken(jwt_token)

		try:
			user = User.objects.get(id=jwt_token.payload.get('user_id'))
			user.online = False
			user.save()
		except:
			pass

		refresh_token = request.COOKIES.get('refresh')
		if refresh_token:
			refresh = RefreshToken(refresh_token)
			refresh.blacklist()
		response = Response(status=status.HTTP_200_OK)
		response.delete_cookie('jwt')
		response.delete_cookie('refresh')
		return response
    