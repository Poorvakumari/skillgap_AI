from rest_framework import serializers
from .models import Roadmap,RoadmapSkill

class RoadmapSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=RoadmapSkill
        fields=["skill_name","recommended_level","resources"]

class RoadmapSerializer(serializers.ModelSerializer):
    skills=RoadmapSkillSerializer(many=True,read_only=True)

    class Meta:
        model=Roadmap
        fields=["message","skills"]