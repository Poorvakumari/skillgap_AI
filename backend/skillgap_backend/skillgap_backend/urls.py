"""
URL configuration for skillgap_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.token_views import EmailTokenObtainPairView
from accounts.views import *
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/',EmailTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    
    path('api/register/',RegisterView.as_view(),name='register'),

    path('api/admin-only/',AdminOnlyView.as_view(),name='admin_only'),
    path('api/user-only/',UserOnlyView.as_view(),name='user_only'),
    path('api/common/',CommonView.as_view(),name='common'),
    
    path('api/',include('accounts.urls')),
    path('api/',include('skills.urls')),
    # path('api/accounts/',include('accounts.urls')),

    path('api/jobs/',include('jobs.urls')),
    path('api/job-applications/',include("jobApplication.urls")),
    path('api/roadmap/',include('roadmap.urls')),
]
# if settings.DEBUG:
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

