from django.urls import path
from . import views

urlpatterns = [
    path('api/schools/', views.schoolList.as_view()),
    path('api/schoolinfo/', views.schoolInfoList.as_view()),
    path('api/schooltrends/', views.schoolTrendsList.as_view()),
    path('api/districtnames/', views.districtNameList.as_view()),
    path('api/districtnamesalt/', views.districtNameAltList.as_view()),
    path('api/countynames/', views.countyNameList.as_view()),
    path('api/schoolnames/', views.schoolNameList.as_view()),
    path('api/district/', views.districtList.as_view()),
    path('api/county/', views.countyList.as_view()),
    path('api/statenames/', views.stateNameList.as_view()),
    path('api/state/', views.stateList.as_view()),
    path('api/districttrends/<dist_id>', views.districtTrendsList.as_view()),
    path('api/districttrendsalt/', views.districtTrendsList.as_view()),
    path('api/countytrends/<county_id>', views.countyTrendsList.as_view()),
    path('api/statetrends/<state_abb>', views.stateTrendsList.as_view()),
    path('api/mapschools/', views.mapSchoolsList.as_view())
]