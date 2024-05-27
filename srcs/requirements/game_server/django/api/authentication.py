
import requests
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt

class CustomPermission(BasePermission):
	def has_permission(self, request, view):
		auth_header = request.headers.get('Authorization')

		if not auth_header:
			return False
		
		response = requests.get(f'http://userserver:8000/api/users/me/', headers={'Authorization': f'{auth_header}'})
		if response.status_code != 200:
			return False
		
		return True
