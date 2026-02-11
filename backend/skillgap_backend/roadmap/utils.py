from skills.models import Skill
from jobs.models import JobSkill
from .models import Roadmap,RoadmapSkill

def generate_roadmap(application):
    user=application.user
    job=application.job
    user_skills={
        s.name.lower():s.level
        for s in Skill.objects.filter(user=user,status="APPROVED")
    }
    roadmap=Roadmap.objects.create(
        application=application,
        message="Yo were rejected due to skill gaps.Follow the roadmap below."
    )
    for job_skill in JobSkill.objects.filter(job=job):
        user_level=user_skills.get(job_skill.skill_name.lower())
        if not user_level or user_level !=job_skill.level:
            RoadmapSkill.objects.create(
                roadmap=roadmap,
                skill_name=job_skill.skill_name,
                recommended_level=job_skill.level,
                resources="Learn via documentation,courses, and practice."
            )
    return roadmap