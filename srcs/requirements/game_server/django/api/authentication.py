
import requests
from rest_framework.permissions import BasePermission
import logging

class CustomPermission(BasePermission):
	def has_permission(self, request, view):
		cookies = request.COOKIES

		if not cookies:
			return False

		response = requests.get('http://userserver:8000/api/me', cookies=cookies)
		logging.debug(f'{response}')


		if response.status_code != 200:
			return False
		return True