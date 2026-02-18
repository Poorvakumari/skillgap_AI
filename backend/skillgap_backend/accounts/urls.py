from django.urls import path
from .views import AdminUserListView,ToggleUserStatusView,ToggleUserRoleView,UserDashboardView,UserProfileView

urlpatterns=[
    path('admin/users/',AdminUserListView.as_view(),name='admin_users'),
    path('admin/users/<int:user_id>/toggle-status/',ToggleUserStatusView.as_view(),name='toggle-status'),
    path('admin/users/<int:user_id>/toggle-role/',ToggleUserRoleView.as_view()),
    path('user/dashboard/',UserDashboardView.as_view()),
    path('user/profile/',UserProfileView.as_view()),
    # path('register/',UserRegisterView.as_view(),name='user_register'),
]