
from django.urls import path, include
from .views import UserVeiwSet, friendView, me
from rest_framework import routers

userRouter = routers.DefaultRouter()
userRouter.register(r'users', UserVeiwSet, basename='users')

urlpatterns = [
	path('', include(userRouter.urls)),
	path('me', me), 
	path('me/friend', friendView.as_view()),
]