import React, { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { useParams } from 'react-router-dom'

const JobDetails = () => {
    const {jobId}=useParams();
    const[skills,setSkills]=useState([]);
    const [job,setJobs]=useState(null);
    const [applied,setApplied]=useState(false);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    const fetchJob=useCallback(async()=>{
        try{
            const res=await api.get(`/jobs/${jobId}/`);
            setJobs(res.data);
        } catch (err){
            console.error(err);
            setError("Failed to load the job details.");
        }
    },[jobId]);
    const fetchSkills=useCallback(async()=>{
        try{
            const res=await api.get(`/jobs/${jobId}/skills/`);
            setSkills(res.data);
        } catch(err){
            console.error(err);
            setError("Failed to load skills.")
        }
    },[jobId]);
    useEffect(()=>{
        const loadData=async()=>{
            setLoading(true);
            await Promise.all([fetchJob(),fetchSkills()]);
        };
        if (jobId){
            loadData();
        }
    },[jobId,fetchJob,fetchSkills]);
    const applyJob=async()=>{
        try{
            await api.post(`/job-applications/apply/${jobId}/`);
            alert("Application submitted successfully");
            setApplied(true);
        } catch (err){
            console.error(err);
            alert("Error applying for job");
        }
    }
    if(loading) return <p className='text-center'>Loading...</p>;
    if (error) return <p className='text-red-500 text-center'>{error}</p>;
    if(!job) return null;
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p>{job.description}</p>
        <h2 className="text-xl mt-6">Required Skills</h2>
        <ul>
            {skills.map(skill=>(
                <li key={skill.id}>{skill.skill_name} - {skill.level}</li>
            ))}
        </ul>
        <button
            onClick={applyJob}
            disabled={applied}
            className={`mt-3 px-4 py-2 rounded text-white ${
                applied ? "bg-gray-400" : "bg-black"
            }`}
        >
            {applied ?"Applied" : "Apply"}
        </button>
      </div>
    </>
  )
}

export default JobDetails
