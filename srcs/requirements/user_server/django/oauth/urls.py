from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
	path('login', views.login_to_42.as_view()),
	path('login/done', views.after_login),
 
	path('token/refresh', views.MyRefreshToken.as_view()),
 
	path('logout', views.log_out.as_view()),
	path('withdraw', views.withdraw.as_view()),
 
	path('otp', views.OTPCheckView.as_view()),
	
]
