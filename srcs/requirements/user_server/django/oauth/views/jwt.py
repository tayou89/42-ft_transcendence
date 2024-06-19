

from rest_framework_simplejwt.views import TokenRefreshView

class MyRefreshToken(TokenRefreshView):
	def post(self, request, *args, **kwargs):
		refresh_token = request.COOKIES.get('refresh')
		
		request.data["refresh"] = refresh_token
		response = super().post(request, *args, **kwargs)
		token = response.data["access"]
		response.data = None
		response.set_cookie('jwt', token, httponly=True)
		response.status_code = 204
		return response
