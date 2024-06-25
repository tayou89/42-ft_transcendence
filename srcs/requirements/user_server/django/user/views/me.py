
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import  AccessToken

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from user_manage.authentication import CustomJWTAuthentication

from ..models import User
from ..serializer import UserSerializer
import json

@api_view(['GET'])
# @authentication_classes([CustomJWTAuthentication])
# @permission_classes([IsAuthenticated])
def me(request):
	jwt_token = AccessToken(request.COOKIES.get('jwt'))
	user = User.objects.get(id=jwt_token.payload['user_id'])
	return Response(UserSerializer(user).data)


class friendView(APIView):
 
	def get_instance(self, request):
		jwt_token = AccessToken(request.COOKIES.get('jwt'))
		user = User.objects.get(id=jwt_token.payload.get('user_id'))
		return user

	def post(self, request):
		friend_name = json.loads(request.body)['name']
		user = self.get_instance(request)
  
		if user.name == friend_name:
			return Response({"result": "cant be friend with me"})

		try:
			friend = User.objects.get(name=friend_name)
			friend_list = user.friends.filter(pk=friend.pk)
			
			if len(friend_list) != 0:
				return Response({"result": "already friend"})
	
			user.friends.add(friend.pk)
			user.save()
		except:
			return Response({"result": "no user"})
	
		return Response({"result": "Successfully Added!"})


	def delete(self, request, pk):
		user = self.get_instance(request)
		friend = User.objects.get(pk=pk)

		user.friends.remove(friend)

		return Response({"result": "Successfully Removed!"})
