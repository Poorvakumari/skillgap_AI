from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import JobApplication
from .serializers import JobApplicationSerializer
from roadmap.models import Roadmap
from roadmap.utils import generate_roadmap
from jobs.models import Job
from rest_framework import status

class ApplyJobView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,job_id):
        job=get_object_or_404(Job,id=job_id,is_active=True)
        if JobApplication.objects.filter(user=request.user,job=job).exists():
            return Response({
                "error":"You have already applied for this job"
            },status=status.HTTP_400_BAD_REQUEST)
        application=JobApplication.objects.create(
            user=request.user,
            job=job
        )
        return Response({
            "success":True,
            "message":"Job applied successfully",
            "application_id":application.id,
            "status":application.status
        },status=status.HTTP_201_CREATED)

class AdminEvaluateApplicationView(APIView):
    permission_classes=[IsAdminUser]

    def post(self,request,application_id):
        action=request.data.get("action")
        rejection_reason=request.data.get("reason","")
        application=get_object_or_404(JobApplication,id=application_id)
        if action=="APPROVED":
            application.status="APPROVED"
        elif action=="REJECTED":
            application.status="REJECTED"
            application.rejection_reason=rejection_reason
            application.save()
            generate_roadmap(application)
            return Response({"message":"Application rejected & roadmap created"})
        else:
            return Response({"error":"Invalid action"},status=400)
        application.save()
        return Response({"message":f"Application {action}"})

class AdminJobApplicationListView(APIView):
    permission_classes=[IsAdminUser]

    def get(self,request):
        applications=JobApplication.objects.select_related("user","job")
        serializer=JobApplicationSerializer(applications,many=True)
        return Response(serializer.data)
    
print("Apply job view hit")