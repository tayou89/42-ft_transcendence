
from django.urls import path, include
from . import views
from rest_framework import routers

matchRouter = routers.DefaultRouter()
matchRouter.register(r'matches', views.MatchVeiwSet)

urlpatterns = [
	path('', include(matchRouter.urls)),
]
