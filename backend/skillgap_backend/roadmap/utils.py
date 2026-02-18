from skills.models import Skill
from jobs.models import JobSkill
from .models import Roadmap,RoadmapSkill

def generate_roadmap(application):
    user=application.user
    job=application.job
    user_skills={
        s.name.lower():s.level
        for s in Skill.objects.filter(user=user)
    }
    roadmap=Roadmap.objects.create(
        application=application,
        message="Your application was rejected. Follow the roadmap below to improve."
    )
    skill_gap_found=False
    for job_skill in JobSkill.objects.filter(job=job):
        user_level=user_skills.get(job_skill.skill_name.lower())
        if not user_level or user_level !=job_skill.level:
            skill_gap_found=True
            # missing_skills.append(job_skill.skill_name)
            RoadmapSkill.objects.create(
                roadmap=roadmap,
                skill_name=job_skill.skill_name,
                recommended_level=job_skill.level,
                resources="Learn via documentation,courses, and practice."
            )
    # if not skill_gap_found:
    #     roadmap.message=(
    #         "You were rejected due to missing or insufficient skills."
    #         "Follow the roadmap below to improve."
    #     )
    # else:
    #     roadmap.message=(
    #         "You meet the required skills,but improvements in depth or project experience are recommended."
    #     )
    # roadmap.save()
    if not skill_gap_found:
        RoadmapSkill.objects.create(
            roadmap=roadmap,
            skill_name="Soft skills & Interview Preparation",
            recommended_level="Advanced",
            resources="Improve communication,problem-solving, and interview performance."
        )
    return roadmap