from rest_framework import serializers
from .models import OTPModel

class OTPSerializer(serializers.ModelSerializer):
	class Meta:
		model = OTPModel
		fields = '__all__'