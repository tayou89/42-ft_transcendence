
from ..models import User
from ..serializer import UserSerializer
from match.serializer import MatchSerializer
from match.models import MatchHistory
from django.db.models import Q

from django.http import FileResponse

from rest_framework.decorators import action
import json

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import NotFound

import os

class UserVeiwSet(viewsets.ModelViewSet):

	# permission_classes = [IsAuthenticated]
	
	queryset = User.objects.all()
	serializer_class = UserSerializer
	http_method_names = ['get', 'post', 'patch', 'delete']

	def list(self, request, *args, **kwargs):

		name = request.query_params.get('name', None)

		if name is not None:
			try:
				user = User.objects.get(name=name)
				return Response(UserSerializer(user, many=False).data)
			except User.DoesNotExist:
				raise NotFound(detail='user not found')
	
		return super().list(request, *args, **kwargs)


	# #api/user/me
	# @action(detail=False, methods=['get'], url_path='me')
	# def me(self, request):
	# 	header = request.META.get('HTTP_AUTHORIZATION')

	# 	if header and header.startswith('Bearer '):
	# 		jwt_token = AccessToken(header.split(' ')[1])
		
	# 	user = User.objects.get(id=jwt_token.payload.get('user_id'))

	# 	return Response(UserSerializer(user, many=False).data)


	# # /api/users/me/friend
	# @action(detail=False, methods=['post'], url_path='me/friend')	
	# def add_friend(self, request):
	# 	header = request.META.get('HTTP_AUTHORIZATION')
	# 	friend_name = json.loads(request.body)['name']

	# 	if header and header.startswith('Bearer '):
	# 		jwt_token = AccessToken(header.split(' ')[1])
		
	# 	user = User.objects.get(id=jwt_token.payload.get('user_id'))
		
	# 	if user.name == friend_name:
	# 		return Response({"result": "cant be friend with me"})
  
	# 	try:
	# 		friend = User.objects.get(name=friend_name)
	# 		friend_list = user.friends.filter(pk=friend.pk)
			
	# 		if len(friend_list) != 0:
	# 			return Response({"result": "already friend"})
	
	# 		user.friends.add(friend.pk)
	# 		user.save()
	# 	except:
	# 		return Response({"result": "no user"})
	
	# 	return Response({"result": "Successfully Added!"})


	# /users/{id}/matches/
	@action(detail=True, methods=['get'])
	def matches(self, request, pk=True):
		user = self.get_object()

		matches = MatchHistory.objects.filter(Q(p1=user) | Q(p2=user))
		serializer = MatchSerializer(matches, many=True)

		return Response(serializer.data)
	

	@action(detail=True, methods=['get'], url_path='avatar')
	def avatar(self, request, pk=True):

		avatar_path = os.path.join(os.path.curdir, str(self.get_object().avatar))

		if os.path.exists(avatar_path):
			return FileResponse(open(avatar_path, 'rb'), content_type='image/jpeg')
		return Response({"failed": "zaa"} ,status=status.HTTP_400_BAD_REQUEST)
	
