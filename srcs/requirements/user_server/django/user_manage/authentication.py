from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken

from user_manage import settings

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get('jwt')
        if raw_token is None:
            return None

        try:
            validated_token = AccessToken(raw_token)
            return self.get_user(validated_token), validated_token
        except Exception as e:
            return None