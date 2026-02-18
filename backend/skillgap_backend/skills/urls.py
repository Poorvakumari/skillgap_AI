from django.urls import path
from .views import SkillListAdminView,AddSkillView,UserSkillListCreateView,UserSkillDeleteView,UserSkillUpdateView

urlpatterns=[
    path('add/',AddSkillView.as_view(),name='add_skill'),
    path('admin/skills/',SkillListAdminView.as_view(),name='admin_skills'),
    # path('admin/skills/<int:skill_id>/approve/',ApproveSkillView.as_view(),name='approve_skill'),
    # path('admin/dashboard/',AdminDashboardView.as_view(),name='admin_dashboard'),
    # path('admin/pending-skills/',PendingSkillListView.as_view()),
    # path('admin/skill-action/<int:skill_id>/',SkillActionView.as_view()),
    # path('admin/pending-skills/bulk-action/',BulkSkillActionView.as_view()),
    path('user/skills/',UserSkillListCreateView.as_view(),name='user_skills'),
    path('user/skills/<int:skill_id>/delete/',UserSkillDeleteView.as_view(),name='delete_skill'),
    path('user/skills/<int:skill_id>/update/',UserSkillUpdateView.as_view()),
    # path('user/skills-summary/',UserSkillsSummaryView.as_view()),
]