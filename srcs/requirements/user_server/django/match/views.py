
from .models import MatchHistory
from .serializer import MatchSerializer
from rest_framework import viewsets

class MatchVeiwSet(viewsets.ModelViewSet):
	queryset = MatchHistory.objects.all()
	serializer_class = MatchSerializer
	http_method_names = ['get', 'post']
