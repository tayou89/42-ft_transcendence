# from django.shortcuts import render
# from django.core.cache import cache
# from django.http import JsonResponse

from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from .models import Room, RoomSerializer

from django.shortcuts import render

class RoomListView(ListAPIView):
	renderer_classes = [JSONRenderer]
	permission_classes = [IsAuthenticated]

	queryset = Room.objects.all()
	serializer_class = RoomSerializer


def index(request):
	return render(request, "index.html")

def room(request, room_name):
	return render(request, "room.html", {"room_name": room_name})

# Create your views here.
