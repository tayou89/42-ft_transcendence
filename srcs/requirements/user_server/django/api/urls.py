from django.contrib import admin
from django.urls import path, include

from . import views

from rest_framework import routers

userRouter = routers.DefaultRouter()
userRouter.register(r'users', views.UserVeiwSet)

matchRouter = routers.DefaultRouter()
matchRouter.register(r'matches', views.MatchVeiwSet)

urlpatterns = [
	path('login', views.login_to_42.as_view()),
	path('login/done', views.after_login),
 
	path('token/refresh', views.MyRefreshToken.as_view()),
	path('logout', views.log_out.as_view()),

	path('', include(userRouter.urls)),
	path('', include(matchRouter.urls)),
	
]
