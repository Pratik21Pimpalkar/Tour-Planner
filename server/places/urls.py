from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('api/search-place/', autoCompletePlaceSearch.as_view()),
    path('api/get-place-details/', getPlaceDetails.as_view()),
    path('api/travel/', chatgpt.as_view())
]
