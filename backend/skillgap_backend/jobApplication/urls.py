from django.urls import path
from .views import *
urlpatterns=[
    path('apply/',ApplyJobView.as_view()),
    path('evaluate/<int:application_id>/',AdminEvaluateApplicationView.as_view()),
]