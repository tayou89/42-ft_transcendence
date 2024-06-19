
from django.urls import path, include
from .views import UserVeiwSet
from rest_framework import routers

userRouter = routers.DefaultRouter()
userRouter.register(r'users', UserVeiwSet)

urlpatterns = [
	path('', include(userRouter.urls)),
]