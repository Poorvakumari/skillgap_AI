from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Roadmap
from .serializers import RoadmapSerializer

class UserRoadmapView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        roadmaps=Roadmap.objects.filter(application__user=request.user)
        serializer=RoadmapSerializer(roadmaps,many=True)
        return Response(serializer.data)

class RoadmapByApplicationView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,application_id):
        roadmap=Roadmap.objects.get(application_id=application_id)
        serializer=RoadmapSerializer(roadmap)
        return Response(serializer.data)