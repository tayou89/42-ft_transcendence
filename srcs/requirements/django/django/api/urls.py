from django.contrib import admin
from django.urls import path, include

from . import views

from rest_framework import routers

userRouter = routers.DefaultRouter()
userRouter.register(r'users', views.UserVeiwSet)

matchRouter = routers.DefaultRouter()
matchRouter.register(r'matches', views.MatchVeiwSet)

urlpatterns = [
	path('login/', views.loginTo42.as_view()),
	path('loginin/', views.main),

	path('', include(userRouter.urls)),
	path('', include(matchRouter.urls)),
	
	path('token/', views.MyMakeToken.as_view()),
	path('token/refresh', views.MyRefreshToken.as_view()),
]
