from django.shortcuts import render
from .serializers import RegisterSerializer,AdminUserSerializer,UserProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .permissions import IsAdmin,IsUser
from .models import User
from rest_framework.permissions import IsAuthenticated
from skills.models import Skill
from rest_framework.parsers import MultiPartParser,FormParser
from jobApplication.models import JobApplication

class RegisterView(APIView):
    permission_classes=[]

    def post(self,request):
        serializer=RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user=serializer.save()
            return Response({
                "message":"User registered successfully",
                "email":user.email,
                "role":user.role
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class AdminOnlyView(APIView):
    permission_classes=[IsAdmin]
    def get(self,request):
        return Response ({
            "message":"Welcome admin-you have full access."
        })
    
class UserOnlyView(APIView):
    permission_classes=[IsUser]
    def get(self,request):
        return Response({
            "message":"Welcome User — this is your dashboard."
        })
    
class CommonView(APIView):
    def get(self,request):
        return Response({
            "message":"This page is for both Admin and User"
        })

class AdminUserListView(APIView):
    permission_classes=[IsAuthenticated,IsAdmin]
    def get(self,request):
        users=User.objects.all().order_by("-created_at")
        serializer=AdminUserSerializer(users,many=True)
        return Response(serializer.data)
    
class ToggleUserStatusView(APIView):
    permission_classes=[IsAuthenticated,IsAdmin]

    def post(self,request,user_id):
        try:
            user=User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error":"User not found"},status=404)
        if user==request.user:
            return Response({"error":"You cannot block yourself"},status=400)
        user.is_active=not user.is_active
        user.save()
        return Response({
            "message":"User status updated successfully",
            "is_active":user.is_active
        })

class ToggleUserRoleView(APIView):
    permission_classes=[IsAuthenticated,IsAdmin]

    def post(self,request,user_id):
        try:
            user=User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error":"User not found"},status=404)
        if user==request.user:
            return Response({"error":"You cannot block yourself"},status=400)
        if user.role=="ADMIN":
            user.role="USER"
            user.is_staff=False
        else:
            user.role="ADMIN"
            user.is_staff=True
        user.save()
        return Response({
            "message":"User role updated successfully",
            "role":user.role
        })

class UserDashboardView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user=request.user
        return Response({
            "total_applications":JobApplication.objects.filter(user=request.user).count(),
            "pending_applications":JobApplication.objects.filter(user=request.user,status='PENDING').count(),
            "approved_applications":JobApplication.objects.filter(user=request.user,status='APPROVED').count(),
            "rejected_applications":JobApplication.objects.filter(user=request.user,status='REJECTED').count(),
        })
    
class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]
    def get(self,request):
        # serializer=UserProfileSerializer(request.user)
        # return Response(serializer.data)
        user=request.user
        applications=JobApplication.objects.filter(user=user)
        # skills=Skill.objects.filter(user=user)
        # approved=skills.filter(status="APPROVED").count()
        # pending=skills.filter(status="PENDING").count()
        # rejected=skills.filter(status="REJECTED").count()
        return Response({
            "email":user.email,
            "first_name":user.first_name,
            "last_name":user.last_name,
            "profile_image":(
                request.build_absolute_uri(user.profile_image.url) if user.profile_image else None
                if user.profile_image else None
            ),
            "date_joined":user.created_at,
            "jobapplication_summary":{
                "Total_applications":applications.count(),
                "approved_applications":applications.filter(status="APPROVED").count(),
                "pending_applications":applications.filter(status="PENDING").count(),
                "rejected_applications":applications.filter(status="REJECTED").count()
            }
        })
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def put(self,request):
        user=request.user
        user.first_name=request.data.get("first_name") or user.first_name
        user.last_name=request.data.get("last_name") or user.last_name

        if "profile_image" in request.FILES:
            user.profile_image=request.FILES["profile_image"]
        user.save()
        return Response({"message":"Profile updated successfully"},
                        status=status.HTTP_200_OK)


# class UserRegisterView(APIView):
#     def post(self,request):
#         serializer=UserRegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user=serializer.save()
#             return Response(
#                 {
#                     "message":"User created successfully"
#                 },status=status.HTTP_201_CREATED
#             )
# 