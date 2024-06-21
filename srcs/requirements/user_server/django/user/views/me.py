
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import  AccessToken

from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..models import User
from ..serializer import UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    jwt_token = AccessToken(request.COOKIES.get('jwt'))
    user = User.objects.get(id=jwt_token.payload['user_id'])
    return Response(UserSerializer(user).data)


class friendView(APIView):
    
	# permission_classes = [IsAuthenticated]
 
	def get_instance(self, request):
		jwt_token = AccessToken(request.COOKIES.get('jwt'))
		user = User.objects.get(id=jwt_token.payload.get('user_id'))
		return user

	def post(self, request):
		friend_name = request.POST.get('name')
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


	def delete(self, request):
		friend_name = request.POST.get('name')
		user = self.get_instance(request)
  
		if user.name == friend_name:
			return Response({"result": "invalid user"})

		try:
			friend = User.objects.get(name=friend_name)
			friend_list = user.friends.filter(pk=friend.pk)
			
			if len(friend_list) == 0:
				return Response({"result": "not friend"})
	
			user.friends.remove(friend.pk)
			user.save()
		except:
			return Response({"result": "no user"})
	
		return Response({"result": "Successfully Removed!"})
