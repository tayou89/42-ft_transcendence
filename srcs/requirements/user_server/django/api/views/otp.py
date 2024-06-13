
from rest_framework.views import APIView
from ..models import User, OTPModel
from django.utils import timezone
from datetime import timedelta

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

class OTPCheckView(APIView):
	def post(self, request):
		now = timezone.now()
		pk = request.COOKIES.get('pk')
		otp = OTPModel.objects.get(user=pk)
  
		form_data = request.POST.get('code', None)
  
		if now - otp.created_at > timedelta(minutes=3):
			return Response({'result': 'code has expired'})


		if form_data == otp.code:
			user_instance = User.objects.get(pk=pk)
			response = Response({'result': 'success'})
			token = RefreshToken.for_user(user_instance)
			response.set_cookie('jwt', str(token.access_token), httponly=True)
			response.set_cookie('refresh', str(token), httponly=True)
			response.delete_cookie('pk')
			otp.delete()
			return Response({'result': 'success'})
		else:
			return Response({'result': 'failed'})
