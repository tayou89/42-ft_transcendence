from rest_framework import serializers
from .models import *

class MatchSerializer(serializers.ModelSerializer):
	class Meta:
		model = MatchHistory
		fields = '__all__'

