from django.contrib import admin
from .models import User
# Register your models here.
@admin.register(User)
class userAdmin(admin.ModelAdmin):
    list_display=('email','role','is_active','is_staff','created_at')
    list_filter=('role','is_active','is_staff')
    search_fields=('email',)
    ordering=('created_at',)