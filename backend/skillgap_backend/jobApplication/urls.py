from django.urls import path
from .views import *
urlpatterns=[
    path('apply/<int:job_id>/',ApplyJobView.as_view()),
    path('admin/evaluate/<int:application_id>/',AdminEvaluateApplicationView.as_view()),
    path('admin/applications/',AdminJobApplicationListView.as_view()),
    path('my/',UserApplicationListView.as_view()),
    path('admin/dashboard-stats/',AdminDashboardView.as_view()),
]