
from rest_framework.views import APIView
from user.models import User
from ..models import OTPModel
from django.utils import timezone
from datetime import timedelta
import json

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

class OTPCheckView(APIView):
	def post(self, request):
		try:
			now = timezone.now()
			pk = request.COOKIES.get('pk')
			otp = OTPModel.objects.get(user=pk)
	
			form_data = json.loads(request.body)

			if now - otp.created_at > timedelta(minutes=3):
				return Response({'result': 'code has expired'})

			if form_data['code'] == otp.code:
				user_instance = User.objects.get(pk=pk)
				user_instance.online = True
				user_instance.save()
				response = Response({'result': 'success'})
				token = RefreshToken.for_user(user_instance)
				response.set_cookie('jwt', str(token.access_token), httponly=True)
				response.set_cookie('refresh', str(token), httponly=True)
				response.delete_cookie('pk')
				otp.delete()
				return response
			else:
				return Response({'result': 'failed'})
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
   
		return response
