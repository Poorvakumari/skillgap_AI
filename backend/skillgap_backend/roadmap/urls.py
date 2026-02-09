from django.urls import path
from .views import *
urlpatterns=[
    path('my/',UserRoadmapView.as_view()),
]