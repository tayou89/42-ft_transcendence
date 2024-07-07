import os
	
from ..models import User
from ..serializer import UserSerializer
from match.serializer import MatchSerializer
from match.models import MatchHistory
from django.db.models import Q

from rest_framework.views import APIView
from django.http import FileResponse
from rest_framework.decorators import action

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticated
from user_manage.authentication import CustomJWTAuthentication
from rest_framework.permissions import AllowAny

 
class GameResultView(APIView):
	permission_classes = [AllowAny]
	def patch(self, request):
     
		winner = User.objects.get(id=request.data['winner'])
		winner.wins += 1
		winner.exp += 1000
		winner.save()
		
		loser = User.objects.get(id=request.data['loser'])
		loser.losses += 1
		loser.exp += 300
		loser.save()

		return Response(status=status.HTTP_200_OK)


class UserVeiwSet(viewsets.ModelViewSet):

	authentication_classes = [CustomJWTAuthentication]
	permission_classes = [IsAuthenticated]
	
	queryset = User.objects.all()
	serializer_class = UserSerializer
	http_method_names = ['get', 'post', 'patch', 'delete']
 
	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = UserSerializer(instance)
		return Response(serializer.data)

	def list(self, request, *args, **kwargs):

		name = request.query_params.get('name', None)

		if name is not None:
			try:
				user = User.objects.get(name=name)
				return Response(UserSerializer(user, many=False).data)
			except User.DoesNotExist:
				raise NotFound(detail='user not found')
	
		return super().list(request, *args, **kwargs)


	# /users/{id}/matches/
	@action(detail=True, methods=['get'])
	def matches(self, request, pk=True):
		user = self.get_object()

		matches = MatchHistory.objects.filter(Q(p1=user) | Q(p2=user)).order_by('-date')
		serializer = MatchSerializer(matches, many=True)

		return Response(serializer.data)
	

	@action(detail=True, methods=['get'], url_path='avatar')
	def avatar(self, request, pk=True):

		avatar_path = os.path.join(os.path.curdir, str(self.get_object().avatar))

		if os.path.exists(avatar_path):
			return FileResponse(open(avatar_path, 'rb'), content_type='image/jpeg')
		return Response({"failed": "zaa"} ,status=status.HTTP_400_BAD_REQUEST)
	
