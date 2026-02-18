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
from rest_framework import generics

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
        rejection_type=request.data.get("rejection_type","")
        application=get_object_or_404(JobApplication,id=application_id)
        if action=="APPROVED":
            application.status="APPROVED"
            
        elif action=="REJECTED":
            application.status="REJECTED"
            application.rejection_reason=rejection_reason
            application.rejection_type=rejection_type
            application.save()
            if not hasattr(application,"roadmap"):
                generate_roadmap(application)
            return Response({"message":"Application rejected & roadmap created"})
        application.save()
        return Response({"message":f"Application {action}"})

class AdminJobApplicationListView(generics.ListAPIView):
    serializer_class=JobApplicationSerializer
    permission_classes=[IsAdminUser]

    def get_queryset(self):
        return JobApplication.objects.all().select_related('user','job').order_by('-applied_at')
    
print("Apply job view hit")

class UserApplicationListView(generics.ListAPIView):
    serializer_class=JobApplicationSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(
            user=self.request.user
        ).select_related('job').order_by('-applied_at')
    
class AdminDashboardView(APIView):
    permission_classes=[IsAdminUser]

    def get(self,request):
        total_applications=JobApplication.objects.count()
        pending_applications=JobApplication.objects.filter(status="PENDING").count()
        approved_applications=JobApplication.objects.filter(status="APPROVED").count()
        rejected_applications=JobApplication.objects.filter(status="REJECTED").count()
        return Response({
            "total_applications":total_applications,
            "pending_applications":pending_applications,
            "approved_applications":approved_applications,
            "rejected_applications":rejected_applications
        })