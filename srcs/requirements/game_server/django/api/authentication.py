
import requests
from rest_framework.permissions import BasePermission

class CustomPermission(BasePermission):
	def has_permission(self, request, view):
		auth_header = request.headers.get('Authorization')

		if not auth_header:
			return False
		
		response = requests.get(f'http://userserver:8000/api/users/me/', headers={'Authorization': f'{auth_header}'})
		if response.status_code != 200:
			return False
		
		return True
