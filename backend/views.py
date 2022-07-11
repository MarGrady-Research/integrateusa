from django.shortcuts import render
from backend.models import StateSeg, DistSeg, CountySeg
from rest_framework import generics
from backend.serializers import StateSerializer, DistrictSerializer, CountySerializer


class districtList(generics.ListAPIView):
    queryset = DistSeg.objects.all()
    serializer_class = DistrictSerializer
    filterset_fields = [
        'year',
        'grade',
        'dist_id',
    ]

class countyList(generics.ListAPIView):
    queryset = CountySeg.objects.all()
    serializer_class = CountySerializer
    filterset_fields = [
        'year',
        'grade',
        'conum',
    ]

class stateList(generics.ListAPIView):
    queryset = StateSeg.objects.all()
    serializer_class = StateSerializer
    filterset_fields = [
        'year',
        'grade',
        'state_abb',
    ]