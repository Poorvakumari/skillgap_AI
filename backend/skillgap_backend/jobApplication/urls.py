from django.urls import path
from .views import *
urlpatterns=[
    path('apply/<int:job_id>/',ApplyJobView.as_view()),
    path('admin/applications/<int:application_id>/evaluate/',AdminEvaluateApplicationView.as_view()),
    path('admin/applications/',AdminJobApplicationListView.as_view()),
]