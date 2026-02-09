from django.db import models

# Create your models here.
class Job(models.Model):
    title=models.CharField(max_length=200)
    description=models.TextField()
    location=models.CharField(max_length=100,blank=True)
    experience_level=models.CharField(
        max_length=50,
        choices=[
            ("Fresher","Fresher"),
            ("Junior","Junior"),
            ("Mid","Mid"),
        ]
    )
    is_active=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class JobSkill(models.Model):
    job=models.ForeignKey(Job,on_delete=models.CASCADE,related_name="required_skills")
    skill_name=models.CharField(max_length=100)
    level=models.CharField(
        max_length=50,
        choices=[
            ("Beginner","Beginner"),
            ("intermediate","intermediate"),
            ("Advanced","Advanced")
        ]
    )
    is_mandatory=models.BooleanField(default=True)

    def __str__(self):
        return f"{self.skill_name} - {self.job.title}"
