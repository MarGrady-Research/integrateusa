from rest_framework import serializers
from backend.models import SchoolInfo, SchoolTrends, CountySegSchools, DistSeg, StateSeg, DistNames, DistNamesAlt, CountyNames, SchoolNames, StateNames, CountyTrends, DistrictTrends, DistrictTrendsAlt, StateTrends, MapSchools

class SchoolInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolInfo
        fields = '__all__'

class SchoolTrendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolTrends
        fields = ['sch_name', 'year', 'grade', 'level', 'asian', 'black', 'hispanic', 'other', 'white']

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
        fields = ["year","grade","asian","black","hispanic","white","other"]

class DistrictTrendAltSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictTrendsAlt
        fields = '__all__'

class CountyTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountyTrends
        fields = ["year","grade","asian","black","hispanic","white","other"]

class StateTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateTrends
        fields = ["year","grade","asian","black","hispanic","white","other"]


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
        fields = ['nces_id',
                  'dist_id',
                  'county_id',
                  'state_abb',
                  'sch_name',
                  'dist_name',
                  'county_name',
                  'lon_new',
                  'lat_new',
                  'xminimum',
                  'yminimum',
                  'xmaximum',
                  'ymaximum',
                  'asian',
                  'black',
                  'hispanic',
                  'other', 
                  'white'] 

