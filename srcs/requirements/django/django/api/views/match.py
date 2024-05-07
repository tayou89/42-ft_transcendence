
from ..models import MatchHistory
from ._serializer import MatchSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class MatchVeiwSet(viewsets.ModelViewSet):
	permission_classes = [IsAuthenticated]

	queryset = MatchHistory.objects.all()
	serializer_class = MatchSerializer
