import React, { useState } from 'react'
import api from '../../services/api'
import {  useNavigate } from 'react-router-dom';

const JobCard = ({job}) => {
    const [applied,setApplied]=useState(false);
    const [error,setError]= useState("");
    const navigate=useNavigate();
    const applyJob=async()=>{
        try{
            await api.post(`/job-applications/apply/${job.id}/`);
            setApplied(true);
        } catch(err){
            setError(err.response?.data?.error || "Failed to apply");
        }
    };

    return (
    <>
        
        <div className="  bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-2xl p-6 shadow-xl hover:scale-105 transition">

            <h2 className="font-bold text-xl mb-2">{job.title}</h2>
            <p className="text-white/70 text-sm line-clamp-3">{job.description}</p>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex gap-3 mt-3">
                <button
                    className='inline-block mt-4 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg text-sm font-medium'
                    onClick={()=>navigate(`/user/jobs/${job.id}`)}
                >
                    View Details
                </button>
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
        </div>
        
    </>
  )
}

export default JobCard
