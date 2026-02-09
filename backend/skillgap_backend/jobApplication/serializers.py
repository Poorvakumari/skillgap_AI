from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    job_title=serializers.CharField(source="job.title",read_only=True)
    class Meta:
        model=JobApplication
        fields=[
            "id","job","job_title","status","rejection_reason","applied_at"
        ]
        read_only_fields=["status","rejection_reason"]