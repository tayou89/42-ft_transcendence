
from .models import MatchHistory
from .serializer import MatchSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from user_manage.authentication import CustomJWTAuthentication

class MatchVeiwSet(viewsets.ModelViewSet):
	authentication_classes = [CustomJWTAuthentication]
	permission_classes = [IsAuthenticated]

	queryset = MatchHistory.objects.all()
	serializer_class = MatchSerializer
