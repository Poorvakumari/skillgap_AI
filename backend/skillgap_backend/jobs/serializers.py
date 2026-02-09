from rest_framework import serializers
from .models import Job,JobSkill

class JobSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=JobSkill
        fields=["id","skill_name","level","is_mandatory"]

class JobSerializer(serializers.ModelSerializer):
    required_skills=JobSkillSerializer(many=True,read_only=True)

    class Meta:
        model=Job
        fields=["id","title","description","location","experience_level","is_active","created_at","required_skills"]