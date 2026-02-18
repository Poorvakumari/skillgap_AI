from django.db import models
from jobApplication.models import JobApplication
class Roadmap(models.Model):
    application=models.OneToOneField(JobApplication,on_delete=models.CASCADE,related_name='roadmap')
    message=models.TextField(help_text="Why user was rejected")

    def __str__(self):
        return f"Roadmap for {self.application.user}"
    
class RoadmapSkill(models.Model):
    roadmap=models.ForeignKey(Roadmap,on_delete=models.CASCADE,related_name='skills')
    skill_name=models.CharField(max_length=100)
    recommended_level=models.CharField(
        max_length=50,
        choices=[
            ("Beginner","Beginner"),
            ("intermediate","intermediate"),
            ("Advanced","Advanced")
        ]
    )
    resources=models.TextField(blank=True)
