from django.shortcuts import render
from backend.models import Schools, StateSeg, DistSeg, CountySegSchools, DistNames, CountyNames, StateNames
from rest_framework import generics, filters
from django.db.models import Q
from django.contrib.postgres import search
from backend.serializers import SchoolsSerializer, StateSerializer, DistrictSerializer, CountySchoolsSerializer, DistNameSerializer, CountyNameSerializer, StateNameSerializer


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

class districtList(generics.ListAPIView):
    queryset = DistSeg.objects.all()
    serializer_class = DistrictSerializer
    filterset_fields = [
        'year',
        'grade',
        'dist_id',
    ]

class districtNameList(generics.ListAPIView):
    queryset = DistNames.objects.all()
    serializer_class = DistNameSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        '^dist_id',
        '^dist_name'
    ]

class countyList(generics.ListAPIView):
    queryset = CountySegSchools.objects.all()
    serializer_class = CountySchoolsSerializer
    filterset_fields = [
        'year',
        'grade',
        'county_id',
    ]

class countyNameList(generics.ListAPIView):
    queryset = CountyNames.objects.all()
    serializer_class = CountyNameSerializer
    context_object_name = "county_name"

    def get_queryset(self):
        query = self.request.GET.get("q")
        # search_vector = search.SearchVector('county_name')
        # search_query = search.SearchQuery(query) #+ ':*', search_type='raw')
        return CountyNames.objects.filter(county_name__istartswith = query)

class stateList(generics.ListAPIView):
    queryset = StateSeg.objects.all()
    serializer_class = StateSerializer
    filterset_fields = [
        'year',
        'grade',
        'state_abb',
    ]

class stateNameList(generics.ListAPIView):
    queryset = StateNames.objects.all()
    serializer_class = StateNameSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        '^state_abb',
        '^state_name'
    ]