from rest_framework import serializers
from .models import Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=['id','name','created_at','level']
        # read_only_fields=['status']

class PendingSkillSerializer(serializers.ModelSerializer):
    user_email=serializers.CharField(source='user.email',read_only=True)
    class Meta:
        model=Skill
        fields=['id','name','user_email','created_at','level']