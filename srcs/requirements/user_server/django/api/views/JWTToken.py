
from ..models import User
from ._serializer import UserSerializer

from django.core.cache import cache

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# class MyMakeToken(APIView):
# 	def post(self, request):
# 		name = request.data.get('name')

# 		if not name:
# 			return Response({"name": "This field is required"}, status=status.HTTP_400_BAD_REQUEST)

# 		try:
# 			user = User.objects.get(name=name)
# 		except User.DoesNotExist:
# 			return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)

# 		token = RefreshToken.for_user(user)

# 		return Response({
# 			"token": str(token.access_token),
# 			"refresh": str(token),
# 		}, status=status.HTTP_200_OK)


class MyRefreshToken(APIView):
	def post(self, request):
	 
		refresh_token = request.COOKIES.get('refresh_token')
		
		if refresh_token is None:
			return Response({"refresh_token": "This field is required"}, status=status.HTTP_400_BAD_REQUEST)

		try:
			new_token = RefreshToken(refresh_token)
		except:
			return Response({"refresh_token": "blacklisted token"})

		return Response({
			"token": str(new_token.access_token),
			"refresh": str(new_token),
		}, status=status.HTTP_200_OK)

class log_out(APIView):
	def post(self, request):
		refresh_token = request.data['refresh_token']
		token = RefreshToken(refresh_token)
		token.blacklist()
		return Response({"success": f"hi"}, status=status.HTTP_205_RESET_CONTENT)