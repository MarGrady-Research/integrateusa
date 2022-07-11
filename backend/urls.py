from django.urls import path
from . import views

urlpatterns = [
    path('api/state/', views.stateList.as_view()),
    path('api/district/', views.districtList.as_view()),
    path('api/county/', views.countyList.as_view()),
]