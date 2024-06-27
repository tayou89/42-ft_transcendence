
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .authentication import CustomPermission
from .models import Room, RoomSerializer

class RoomViewset(viewsets.ModelViewSet):
	renderer_classes = [JSONRenderer]
	permission_classes = [CustomPermission]
	http_method_names = ['get', 'post']
	queryset = Room.objects.all()
	serializer_class = RoomSerializer


# Create your views here.
