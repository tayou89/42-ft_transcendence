
import requests
from rest_framework.permissions import BasePermission

# from rest_framework.authentication import BaseAuthentication
# from rest_framework.exceptions import AuthenticationFailed
# from django.conf import settings
# import jwt

class CustomPermission(BasePermission):
	def has_permission(self, request, view):
		auth_header = request.headers.get('Authorization')

		if not auth_header:
			return False
		
		response = requests.get(f'http://userserver:8000/api/users/me/', headers={'Authorization': f'{auth_header}'})
		if response.status_code != 200:
			return False
		
		return True
		

		

# class CustomJWTAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         auth_header = request.headers.get('Authorization')
		
#         if not auth_header:
#             return None

#         try:
#             token_type, token = auth_header.split()
#             if token_type.lower() != 'bearer':
#                 return None
#         except ValueError:
#             return None
		
#         try:
#             payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Token has expired')
#         except jwt.InvalidTokenError:
#             raise AuthenticationFailed('Invalid token')

#         user_id = payload.get('user_id')
#         if not user_id:
#             raise AuthenticationFailed('Invalid payload')

		
#         response = requests.get(f'http://userserver:8000/api/users/me/', headers={'Authorization': f'{auth_header}'})
#         if response.status_code != 200:
#             raise AuthenticationFailed("Invalid token")

#         user_data = response.json()
#         return (user_data, token)

#     def authenticate_header(self, request):
#         return 'Bearer'

