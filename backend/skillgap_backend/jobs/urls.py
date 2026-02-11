from django.urls import path
from .views import *
urlpatterns=[
    path('admin/create/',AdminJobCreateView.as_view()),
    path('list/',UserJobListView.as_view()),
    path('admin/<int:job_id>/add-skill/',AddJobSkillView.as_view(),name='add-job-skill'),
    path('admin/<int:job_id>/skills/',AdminJobSkillsView.as_view(),name='admin-job-skills')
]