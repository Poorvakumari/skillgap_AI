from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import JobApplication
from .serializers import JobApplicationSerializer
from roadmap.models import Roadmap

class ApplyJobView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({
                "message":"Applied Successfully"
            },status=201)
        return Response(serializer.errors,status=400)
    
class AdminEvaluateApplicationView(APIView):
    permission_classes=[IsAdminUser]

    def post(self,request,application_id):
        action=request.data.get("action")
        reason=request.data.get("reason","")
        application=JobApplication.objects.get(id=application_id)
        if action=="APPROVED":
            application.status="APPROVED"
            application.save()
            return Response({"message":"Application approved"})
        if action=="REJECTED":
            application.status="REJECTED"
            application.rejection_reason=reason
            application.save()
            Roadmap.objects.create(application=application,message=reason)
            return Response({"message":"Application rejected & roadmap created"})
