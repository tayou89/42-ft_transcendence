
from ..models import User, MatchHistory
from ._serializer import UserSerializer, MatchSerializer

from django.http import HttpResponse, FileResponse

from rest_framework.decorators import action

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken

import os

class UserVeiwSet(viewsets.ModelViewSet):

	permission_classes = [IsAuthenticated]
	
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def list(self, request, *args, **kwargs):

		name = request.query_params.get('name', None)

		if name:
			return Response(status=status.HTTP_204_NO_CONTENT)  # No Content response

		queryset = self.filter_queryset(self.get_queryset())
		page = self.paginate_queryset(queryset)

		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)
			
		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)


	@action(detail=False, methods=['get'])
	def me(self, request):
		header = request.META.get('HTTP_AUTHORIZATION')

		if header and header.startswith('Bearer '):
			jwt_token = AccessToken(header.split(' ')[1])
		
		user = User.objects.get(id=jwt_token.payload.get('user_id'))

		return Response(UserSerializer(user, many=False).data)


	# /users/{id}/matches/
	@action(detail=True, methods=['get'])
	def matches(self, request):
		user = self.get_object()

		matches = MatchHistory.objects.filter(left=user) | MatchHistory.objects.filter(right=user)
		serializer = MatchSerializer(matches, many=True)

		return Response(serializer.data)
	

	@action(detail=True, methods=['get'], url_path='avatar')
	def avatar(self, request, pk=True):

		avatar_path = os.path.join(os.path.curdir, str(self.get_object().avatar))

		if os.path.exists(avatar_path):
			return FileResponse(open(avatar_path, 'rb'), content_type='image/jpeg')
		return Response({"failed": "zaa"} ,status=status.HTTP_400_BAD_REQUEST)
