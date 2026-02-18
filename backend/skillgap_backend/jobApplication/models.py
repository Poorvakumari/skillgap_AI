from django.db import models

# Create your models here.
from django.conf import settings
from jobs.models import Job

class JobApplication(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    job=models.ForeignKey(Job,on_delete=models.CASCADE)
    status=models.CharField(
        max_length=50,
        choices=[
            ("PENDING","PENDING"),
            ("APPROVED","APPROVED"),
            ("REJECTED","REJECTED"),
        ],
        default="PENDING"
    )
    rejection_reason=models.TextField(blank=True)
    applied_at=models.DateTimeField(auto_now_add=True)
    REJECTION_TYPE_CHOICES=[
        ("SKILL_GAP","Skill Gap"),
        ("CULTURE_FIT","Culture Fit"),
        ("COMMUNICATION","Communication"),
        ("EXPERIENCE","Experience Level"),
        ("OTHER","Other"),
    ]
    rejection_type=models.CharField(
        max_length=30,
        choices=REJECTION_TYPE_CHOICES,
        null=True,
        blank=True
    )
    class Meta:
        unique_together=("user","job")

    def __str__(self):
        return f"{self.user} -> {self.job.title}"
