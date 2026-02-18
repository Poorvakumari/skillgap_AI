from django.urls import path
from .views import *
urlpatterns=[
    path('admin/create/',AdminJobCreateView.as_view()),
    path('list/',UserJobListView.as_view()),
    path('admin/<int:job_id>/add-skill/',AddJobSkillView.as_view(),name='add-job-skill'),
    path('admin/<int:job_id>/skills/',AdminJobSkillsView.as_view(),name='admin-job-skills'),
    path('<int:job_id>/skills/',JobSkillsView.as_view(),name='job-skills'),
    path('<int:job_id>/',JobDetailView.as_view(),name='job-detail'),
    path('admin/skills/<int:pk>/update/',UpdateJobSkillView.as_view()),
    path('admin/skills/<int:pk>/delete/',DeleteJobSkillView.as_view()),
]