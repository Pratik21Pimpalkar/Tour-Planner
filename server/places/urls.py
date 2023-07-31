from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('api/search-place/', autoCompletePlaceSearch.as_view()),
    path('api/get-place-details/', getPlaceDetails.as_view()),
    path('api/travel/', chatgpt.as_view()),
    # path('api/colab/', colab.as_view()),
    path('calculate-tour-plan/', calculate_tour_plan_view.as_view(),
         name='calculate_tour_plan'),

    path('list-of-hotels',list_of_hotels.as_view())
]
