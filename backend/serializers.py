from rest_framework import serializers
from backend.models import Schools, CountySegSchools, DistSeg, StateSeg, DistNames, CountyNames, StateNames

class SchoolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schools
        fields = '__all__'

class CountySchoolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountySegSchools
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistSeg
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateSeg
        fields = '__all__'

class DistNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistNames
        fields = '__all__'

class CountyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountyNames
        fields = '__all__'

class StateNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateNames
        fields = '__all__'

# class MapSchoolsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MapSchools,
#         fields = '__all__'

