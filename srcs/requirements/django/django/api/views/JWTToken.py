
from ..models import User
from ._serializer import UserSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from rest_framework.decorators import action


class MyMakeToken(APIView):
	def post(self, request):
		name = request.data.get('name')

		if not name:
			return Response({"name": "This field is required"}, status=status.HTTP_400_BAD_REQUEST)

		try:
			user = User.objects.get(name=name)
		except User.DoesNotExist:
			return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)

		token = RefreshToken.for_user(user)

		return Response({
			"token": str(token.access_token),
			"refresh": str(token),
		}, status=status.HTTP_200_OK)


class MyRefreshToken(APIView):
	def post(self, request):
		refresh_token = request.data.get('refresh_token')

		if not refresh_token:
			return Response({"refresh_token": "This field is required"}, status=status.HTTP_400_BAD_REQUEST)
		
		new_token = RefreshToken(refresh_token)

		return Response({
			"token": str(new_token.access_token),
			"refresh": str(new_token),
		}, status=status.HTTP_200_OK)

