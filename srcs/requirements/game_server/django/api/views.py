# from django.shortcuts import render
# from django.core.cache import cache
# from django.http import JsonResponse

from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer
from .models import Room, RoomSerializer

class RoomListView(ListAPIView):
	renderer_classes = [JSONRenderer]

	queryset = Room.objects.all()
	serializer_class = RoomSerializer



# Create your views here.
