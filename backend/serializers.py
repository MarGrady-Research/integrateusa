from rest_framework import serializers
from backend.models import Schools, CountySegSchools, DistSeg, StateSeg, DistNames, DistNamesAlt, CountyNames, SchoolNames, StateNames, CountyTrends, DistrictTrends, DistrictTrendsAlt, StateTrends, MapSchools

class SchoolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schools
        fields = '__all__'

# Name Serializers
class DistNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistNames
        fields = '__all__'

class DistNameAltSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistNamesAlt
        fields = '__all__'

class CountyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountyNames
        fields = '__all__'

class SchoolNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolNames
        fields = '__all__'

class StateNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateNames
        fields = '__all__'


# Trend Serializers
class DistrictTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictTrends
        fields = '__all__'

class DistrictTrendAltSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictTrendsAlt
        fields = '__all__'

class CountyTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountyTrends
        fields = '__all__'

class StateTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateTrends
        fields = '__all__'


# Segregation Serialzers

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


# Serializer for map data

class MapSchoolsSerializer(serializers.ModelSerializer):

    class Meta:
        model = MapSchools
        fields = ['map_data'] 

