from rest_framework import serializers
from backend.models import CountySeg, DistSeg, StateSeg

class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = CountySeg
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistSeg
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateSeg
        fields = '__all__'