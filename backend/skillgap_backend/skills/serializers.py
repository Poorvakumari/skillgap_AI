from rest_framework import serializers
from .models import Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=['id','name','status','created_at']
        read_only_fields=['status']

class PendingSkillSerializer(serializers.ModelSerializer):
    user_email=serializers.CharField(source='user.email',read_only=True)
    class Meta:
        model=Skill
        fields=['id','name','status','user_email','created_at']