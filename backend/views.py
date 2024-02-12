from django.shortcuts import render
from backend.models import Schools, SchoolInfo, SchoolTrends, StateSeg, DistSeg, CountySegSchools, DistNames, DistNamesAlt, CountyNames, SchoolNames, StateNames, DistrictTrends, DistrictTrendsAlt, CountyTrends, StateTrends, MapSchools
from rest_framework import generics, filters
from django.core.serializers import serialize
from django.db.models import Q
from django.contrib.postgres import search
from backend.serializers import SchoolsSerializer, SchoolInfoSerializer, SchoolTrendsSerializer, StateSerializer, DistrictSerializer, CountySchoolsSerializer, DistNameSerializer, DistNameAltSerializer, CountyNameSerializer, SchoolNameSerializer, StateNameSerializer, DistrictTrendSerializer, DistrictTrendAltSerializer, CountyTrendSerializer, StateTrendSerializer, MapSchoolsSerializer

# Schools view 

class schoolList(generics.ListAPIView):
    queryset = Schools.objects.all()
    serializer_class = SchoolsSerializer
    filterset_fields = [
        'year',
        'grade',
        'dist_id',
        'county_id',
        'state_abb',
        'nces_id',
    ]
 
class schoolInfoList(generics.ListAPIView):
    queryset = SchoolInfo.objects.all()
    serializer_class = SchoolInfoSerializer
    filterset_fields = ['nces_id']

class schoolTrendsList(generics.ListAPIView):
    queryset = SchoolTrends.objects.all()
    serializer_class = SchoolTrendsSerializer
    filterset_fields = [
        'nces_id', 
        'year',
        'grade',
    ]

# Names Views

class districtNameList(generics.ListAPIView):
    queryset = DistNames.objects.all()
    serializer_class = DistNameSerializer

    def get_queryset(self):
        query = self.request.GET.get("q")
        return DistNames.objects.annotate(similarity = search.TrigramSimilarity('dist_name', query)).filter(similarity__gte = 0.10).filter(dist_name__icontains = query).order_by('-similarity')

class districtNameAltList(generics.ListAPIView):
    queryset = DistNamesAlt.objects.all()
    serializer_class = DistNameAltSerializer

    def get_queryset(self):
        query = self.request.GET.get("q")
        return DistNamesAlt.objects.annotate(similarity = search.TrigramSimilarity('dist_name', query)).filter(similarity__gte = 0.10).filter(dist_name__icontains = query).order_by('-similarity')

class countyNameList(generics.ListAPIView):
    queryset = CountyNames.objects.all()
    serializer_class = CountyNameSerializer

    def get_queryset(self):
        query = self.request.GET.get("q")
        return CountyNames.objects.annotate(similarity = search.TrigramSimilarity('county_name', query)).filter(similarity__gte = 0.10).filter(county_name__icontains = query).order_by('-similarity')

class schoolNameList(generics.ListAPIView):
    queryset = SchoolNames.objects.all()
    serializer_class = SchoolNameSerializer

    def get_queryset(self):
        query = self.request.GET.get("q")
        return SchoolNames.objects.annotate(similarity = search.TrigramSimilarity('sch_name', query)).filter(similarity__gte = 0.10).filter(sch_name__icontains = query).order_by('-similarity')

class stateNameList(generics.ListAPIView):
    queryset = StateNames.objects.all()
    serializer_class = StateNameSerializer

    def get_queryset(self):
        query = self.request.GET.get("q")
        return StateNames.objects.filter(state_name__istartswith = query).order_by('state_name')


# Trends Views

class districtTrendsList(generics.ListAPIView):
    queryset = DistrictTrends.objects.all()
    serializer_class = DistrictTrendSerializer
    filterset_fields = ['dist_id']

class districtTrendsAltList(generics.ListAPIView):
    queryset = DistrictTrendsAlt.objects.all()
    serializer_class = DistrictTrendAltSerializer
    filterset_fields = ['dist_id']

class countyTrendsList(generics.ListAPIView):
    queryset = CountyTrends.objects.all()
    serializer_class = CountyTrendSerializer
    filterset_fields = ['county_id']

class stateTrendsList(generics.ListAPIView):
    queryset = StateTrends.objects.all()
    serializer_class = StateTrendSerializer
    filterset_fields = [
        'state_abb', 
        'grade', 
        'year'
    ]


# Segregation Views

class districtList(generics.ListAPIView):
    queryset = DistSeg.objects.all()
    serializer_class = DistrictSerializer
    filterset_fields = [
        'year',
        'grade',
        'dist_id',
    ]

class countyList(generics.ListAPIView):
    queryset = CountySegSchools.objects.all()
    serializer_class = CountySchoolsSerializer
    filterset_fields = [
        'year',
        'grade',
        'county_id',
    ]

class stateList(generics.ListAPIView):
    queryset = StateSeg.objects.all()
    serializer_class = StateSerializer
    filterset_fields = [
        'year',
        'grade',
        'state_abb',
    ]


# Serialize GeoJSON data for Map view
class mapSchoolsList(generics.ListAPIView):
    queryset = MapSchools.objects.all()
    serializer_class = MapSchoolsSerializer