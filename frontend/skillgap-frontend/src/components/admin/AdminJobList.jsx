import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';

const AdminJobList = () => {
    const[jobs,setJobs]=useState([]);
    const[page,setPage]=useState(1);
    const [next,setNext]=useState(null);
    const [previous,setPrevious]=useState(null);
    useEffect(()=>{
        fetchJobs();
    },[page]);

    const fetchJobs=async()=>{
        const res= await api.get(`/jobs/list/?page=${page}`);
        setJobs(res.data.results || []);
        setNext(res.data.next);
        setPrevious(res.data.previous);
    }
  return (
    <>
      <div className='space-y-8 text-white'>
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Jobs</h1>
            <Link to='create' className='bg-gradient-to-r from-pink-500 to-purlpe-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition'>
                + Create Job
            </Link>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <table className="w-full text-left">
            <thead className='bg-white/5 text-white/80'>
                <tr>
                    <th className='p-4'>Title</th>
                    <th>Level</th>
                    <th>Status</th>
                    <th>Required Skills</th>
                    <th>Actions</th>
                </tr>
            </thead> 
            <tbody>
                {jobs.map(job=>(
                    <tr key={job.id} className='border-t border-white/10 hover:bg-white/5 transition'>
                        <td className='p-4 font-medium'>{job.title}</td>
                        <td>{job.experience_level}</td>
                        <td>
                            <span
                                className={`px-3 py-1 roundeed-full text-sm ${
                                    job.is_active
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                                }`}
                            >
                                {job.is_active ? "Active" :"Inactive"}
                            </span>
                        </td>
                        <td>
                            {job.required_skills.length>0
                            ? job.required_skills.map((skill,index)=>(
                                <div>
                                    {skill.skill_name} ({skill.level})
                                </div>
                            ))
                        :"No skills"}
                        </td>
                        <td>
                            <Link to={`/admin/jobs/${job.id}/skills`} className='bg-gradient-to-r from-pink-500 to-purlpe-700 hover:underline px-6 py-3 rounded-xl font-semibold hover:scale-105 transition'>Manage Skills</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <div className='flex justify-center gap-4 mt-8'>
            {previous && (
                <button
                    onClick={()=>setPage(page-1)}
                    className='px-6 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition'
                >
                    Previous
                </button>
            )}
            {next &&(
                <button
                    onClick={()=>setPage(page+1)}
                    className='px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition'
                >
                    Next
                </button>
            )}
        </div>
      </div>
    </>
  )
}

export default AdminJobList
