from django.db import models
from accounts.models import User
# Create your models here.
class Skill(models.Model):
    STATUS_CHOICES=(
        ('PENDING','Pending'),
        ('ACCEPTED','Accepted'),
        ('REJECTED','Rejected'),
    )

    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='skills')
    name=models.CharField(max_length=100)
    status=models.CharField(max_length=10,choices=STATUS_CHOICES,default='PENDING')
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}-{self.status}"
