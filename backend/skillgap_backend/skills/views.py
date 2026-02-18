from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from .models import Skill
from jobApplication.models import JobApplication
from .serializers import SkillSerializer,PendingSkillSerializer
from .permissions import IsAdmin
from django.contrib.auth import get_user_model
User=get_user_model()
class AddSkillView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        data=request.data
        skill=Skill.objects.create(
            user=request.user,
            name=data['name']
        )
        return Response({
            "message":"Skill submitted for approval"
        })
    
class SkillListAdminView(APIView):
    permission_classes=[IsAuthenticated,IsAdmin]

    def get(self,request):
        skills=Skill.objects.all()
        serializer=SkillSerializer(skills,many=True)
        return Response(serializer.data)
    
# class ApproveSkillView(APIView):
#     permission_classes=[IsAuthenticated,IsAdmin]

#     def post(self,request,skill_id):
#         try:
#             skill=Skill.objects.get(id=skill_id)
#         except Skill.DoesNotExist:
#             return Response({"error":"Skill not found"},status=404)
#         action=request.data.get("action")
#         if action not in ["APPROVED","REJECTED"]:
#             return Response({"error":"Action must be APROVED or REJECTED"},status=400)
#         skill.status=action
#         skill.save()
#         return Response({"message":f"Skill {action} successfully"})
    
# class AdminDashboardView(APIView):
#     permission_classes=[IsAdmin]
#     def get(self,request):
#         total_users=User.objects.count()
#         total_skills=Skill.objects.count()
#         pending_skills=Skill.objects.filter(status='PENDING').count()
#         approved_skills=Skill.objects.filter(status='APPROVED').count()
#         rejected_skills=Skill.objects.filter(status='REJECTED').count()

#         data={
#             "total_users":total_users,
#             "total_skills":total_skills,
#             "pending_skills":pending_skills,
#             "approved_skills":approved_skills,
#             "rejected_skills":rejected_skills,
#         }
#         return Response(data)
    
# class PendingSkillListView(APIView):
#     permission_classes=[IsAuthenticated,IsAdmin]
#     def get(self,request):
#         skills=Skill.objects.filter(status='PENDING')
#         serializer=PendingSkillSerializer(skills,many=True)
#         return Response(serializer.data)
    
# class SkillActionView(APIView):
#     permission_classes=[IsAuthenticated,IsAdmin]
#     def post(self,request,skill_id):
#         action=request.data.get("action")
#         if action not in ["APPROVED","REJECTED"]:
#             return Response({
#                 "error":"Action must be APPROVED or REJECTED"
#             },status=400
#             )
#         try:
#             skill=Skill.objects.get(id=skill_id)
#         except Skill.DoesNotExist:
#             return Response({"error":"Skill not found"},status=404)
#         skill.status=action
#         skill.save()
#         return Response({"message":f"Skill {action} successfully"})
    
# class BulkSkillActionView(APIView):
#     permission_classes=[IsAuthenticated,IsAdmin]
#     def post(self,request):
#         skill_ids=request.data.get("skill_ids",[])
#         action=request.data.get("action")
#         if action not in ["APPROVED","REJECTED"]:
#             return Response({
#                 "error":"Action must be APPROVED or REJECTED"
#             },status=400
#             )
#         if not skill_ids:
#             return Response({"error":"No skills selected"},status=400)
        
#         skills=Skill.objects.filter(id__in=skill_ids,status="PENDING")
#         updated_count=skills.update(status=action)
#         return Response({"message": f"{updated_count} skills {action.lower()} successfully"})
    
class UserSkillListCreateView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        skills=Skill.objects.filter(user=request.user)
        serializer=SkillSerializer(skills,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer=SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {"message":"Skill added successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserSkillDeleteView(APIView):
    permission_classes=[IsAuthenticated]
    def delete(self,request,skill_id):
        try:
            skill=Skill.objects.get(id=skill_id,user=request.user)
        except Skill.DoesNotExist:
            return Response(
                {"error":"Skill not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        # if skill.status=="APPROVED":
        #     return Response(
        #         {"error":"Approved skills cannot be deleted"},
        #         status=status.HTTP_403_FORBIDDEN
        #     )
        skill.delete()
        return Response(
            {"message":"Skill deleted"},
            status=status.HTTP_204_NO_CONTENT
        )

class UserSkillUpdateView(APIView):
    permission_classes=[IsAuthenticated]
    def put(self,request,skill_id):
        try:
            skill=Skill.objects.get(id=skill_id,user=request.user)
        except Skill.DoesNotExist:
            return Response(
                {"error":"Skill not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        # if skill.status=="APPROVED":
        #     return Response(
        #         {"error":"Approved skills cannot be edited"},
        #         status=status.HTTP_403_FORBIDDEN
        #     )
        serializer=SkillSerializer(skill,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)

# class UserSkillsSummaryView(APIView):
#     permission_classes=[IsAuthenticated]
#     def get(self,request):
#         applications=JobApplication.objects.filter(user=request.user)
#         total_applications=applications.count()
#         approved_applications=applications.objects.filter( status='APPROVED').count()
#         pending_applications=applications.objects.filter( status='PENDING').count()
#         rejected_applications=applications.objects.filter( status='REJECTED').count()

#         data={
#             "total_applications":total_applications,
#             "approved_applications":approved_applications,
#             "pending_applications":pending_applications,
#             "rejected_applications":rejected_applications,
#         }
#         return Response(data)
