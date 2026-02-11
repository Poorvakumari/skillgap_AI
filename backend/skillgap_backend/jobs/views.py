from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .models import Job,JobSkill
from .serializers import JobSerializer,JobSkillSerializer

class AdminJobCreateView(APIView):
    permission_classes=[IsAdminUser]

    def post(self,request):
        serializer=JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)

class UserJobListView(APIView):
    def get(self,request):
        jobs=Job.objects.filter(is_active=True)
        serializer=JobSerializer(jobs,many=True)
        return Response(serializer.data) 
class AddJobSkillView(APIView):
    permission_classes=[IsAdminUser]
    def post(self,request,job_id):
        job=Job.objects.get(id=job_id)
        JobSkill.objects.create(
            job=job,
            skill_name=request.data["skill_name"],
            level=request.data["level"],
            is_mandatory=request.data.get("is_mandatory",True)
        )
        return Response({"message":"Skills added to job"})

class AdminJobSkillsView(APIView):
    permission_classes=[IsAdminUser]
    def get(self,request,job_id):
        skills=JobSkill.objects.filter(job_id=job_id)
        serializer=JobSkillSerializer(skills,many=True)
        return Response(serializer.data)