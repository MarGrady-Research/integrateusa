from django.urls import path
from . import views

urlpatterns = [
    path('api/schools/', views.schoolList.as_view()),
    path('api/districtnames/', views.districtNameList.as_view()),
    path('api/countynames/', views.countyNameList.as_view()),
    path('api/district/', views.districtList.as_view()),
    path('api/county/', views.countyList.as_view()),
    path('api/statenames/', views.stateNameList.as_view()),
    path('api/state/', views.stateList.as_view()),
    path('api/districttrends/', views.districtTrendsList.as_view()),
    path('api/countytrends/', views.countyTrendsList.as_view()),
    path('api/statetrends/', views.stateTrendsList.as_view()),
    # path('api/mapschools/', views.mapSchoolsList.as_view())
]