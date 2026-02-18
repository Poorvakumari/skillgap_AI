from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=['email','password','role']

    def create(self,validated_data):
        user=User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role','USER')
        )
        return user
    
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','role','is_active','is_staff','created_at',]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','role','is_active','created_at']
# class UserRegisterSerializer(serializers.ModelSerializer):
#     password=serializers.CharField(write_only=True)
#     class Meta:
#         model=User
#         fields=['id','email','password']
#     def create(self, validated_data):
#         return User.objects.create_user(
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
