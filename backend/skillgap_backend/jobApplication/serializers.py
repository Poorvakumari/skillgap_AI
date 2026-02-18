from rest_framework import serializers
from .models import JobApplication
from skills.models import Skill
from jobs.models import JobSkill

class JobApplicationSerializer(serializers.ModelSerializer):
    # user=serializers.CharField(source="user.username",read_only=True)
    # job=serializers.CharField(source="job.title",read_only=True)
    user=serializers.SerializerMethodField()
    job=serializers.SerializerMethodField()
    user_skills=serializers.SerializerMethodField()
    required_skills=serializers.SerializerMethodField()
    class Meta:
        model=JobApplication
        fields=[
            "id","user","job","status","rejection_reason","rejection_type","applied_at","user_skills","required_skills"
        ]
        read_only_fields=["rejection_reason","rejection_type"]

    def get_user(self,obj):
        full_name=f"{obj.user.first_name} {obj.user.last_name}".strip()
        return full_name if full_name else obj.user.email
    def get_job(self,obj):
        return obj.job.title
    def get_user_skills(self,obj):
        skills=Skill.objects.filter(user=obj.user)
        return [
            {
                "name":skill.name,
                "level":skill.level
            }
            for skill in skills
        ]
    def get_required_skills(self,obj):
        job_skills=JobSkill.objects.filter(job=obj.job)
        return [
            {
                "name":skill.skill_name,
                "level":skill.level
            }
            for skill in job_skills
        ]