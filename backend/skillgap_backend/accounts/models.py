from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,email,password=None,role='USER'):
        if not email:
            raise ValueError("User must have an email address")
        email=self.normalize_email(email)
        user=self.model(email=email,role=role)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,email,password):
        user=self.create_user(email,password,role='ADMIN')
        user.is_staff=True
        user.is_superuser=True
        user.save()
        return user

class User(AbstractBaseUser,PermissionsMixin):
    ROLE_CHOICES=(
        ('ADMIN','Admin'),
        ('USER','User')
    )
    email=models.EmailField(unique=True)
    role=models.CharField(max_length=10,choices=ROLE_CHOICES,default='USER')
    first_name=models.CharField(max_length=100,blank=True)
    last_name=models.CharField(max_length=100,blank=True)
    profile_image=models.ImageField(
        upload_to='profile_pics/',
        blank=True,
        null=True
    )
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    objects=UserManager()

    USERNAME_FIELD='email'

    def __str__(self):
        return self.email
