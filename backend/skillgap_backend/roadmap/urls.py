from django.urls import path
from .views import *
urlpatterns=[
    path('my/',UserRoadmapView.as_view()),
    path('application/<int:application_id>/',RoadmapByApplicationView.as_view()),
]