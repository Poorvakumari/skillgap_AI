import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const AdminApplications = () => {
    const [applications,setApplications]=useState([]);
    const [selectedType,setSelectedType]=useState("");
    const [selectedAppId,setSelectedAppId]=useState(null);
    const[page,setPage]=useState(1);
    const [next,setNext]=useState(null);
    const [previous,setPrevious]=useState(null);

    useEffect(()=>{
        fetchApplications();
    },[page]);

    const fetchApplications=async()=>{
        const res=await api.get(`/job-applications/admin/applications/?page=${page}`);
        setApplications(res.data.results || []);
        setNext(res.data.next);
        setPrevious(res.data.previous);
    };
    const evaluate=async(id,action)=>{
        await api.post(`/job-applications/admin/evaluate/${id}/`,{
            action:action,
            
        });
        fetchApplications();
    };
  return (
    <>
      <div className='space-y-8 text-white'>
        <h1 className="text-3xl font-bold ">Job Applications</h1>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <table className="w-full text-left">
            <thead className='bg-white/5 text-white/80'>
                <tr className="border-b">
                    <th className='p-3 text-left'>User</th>
                    <th className='p-3 text-left'>Job</th>
                    <th className='p-3 text-left'>User Skills</th>
                    <th className='p-3 text-left'>Required Skills</th>
                    <th className='p-3 text-left'>Status</th>
                    <th className='p-3 text-left'>Action</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(app=>(
                    <tr key={app.id} className='border-t border-white/10 hover:bg-white/5 transition'>
                        <td className='p-3 font-medium'>{app.user}</td>
                        <td className='p-3'>{app.job}</td>
                        <td className='p-3'>
                            {app.user_skills.length>0
                            ? app.user_skills.map((skill,index)=>(
                                <div key={index}>
                                    {skill.name}  ({skill.level})
                                </div>
                            ))
                        : "No Skills"}
                        </td>
                        <td>
                            {app.required_skills.length>0
                            ? app.required_skills.map((skill,index)=>(
                                <div key={index}>
                                    {skill.name} ({skill.level})
                                </div>
                            ))
                        : "No Required Skills"}
                        </td>
                        <td>
                            <span
                                className={`px-4 py-2 rounded-full text-sm ${
                                    app.status==="APPROVED"
                                    ? "bg-green-500/20 text-green-300"
                                    : app.status==="REJECTED"
                                    ? "bg-red-500/20 text-red-300"
                                    : "bg-yellow-500/20 text-yellow-300"
                                }`}
                            >
                                {app.status}
                            </span>
                        </td>
                        <td className='p-3'>
                            {app.status==="PENDING" &&(
                                <>
                                    <button 
                                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                        onClick={()=>evaluate(app.id,"APPROVED")}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={()=>setSelectedAppId(app.id)}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
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
        {selectedAppId && (
            <div className='mt-4 p-4 border rounded bg-gray-100'>
                <h3 className='font-semibold mb-2'>Select Rejection Type</h3>
                <select
                    value={selectedType}
                    onChange={(e)=>setSelectedType(e.target.value)}
                    className='border p-2 mr-2'
                >
                    <option value="">Select Type</option>
                    <option value="SKILL_GAP">Skill Gap</option>
                    <option value="CULTURE_FIT">Culture Fit</option>
                    <option value="COMMUNICATION">Communication</option>
                    <option value="EXPERIENCE">Experience</option>
                    <option value="OTHER">Other</option>
                </select>
                <button
                    className='bg-red-600 text-white px-3 py-1 rounded'
                    onClick={async()=>{
                        await api.post(`/job-applications/admin/evaluate/${selectedAppId}/`,
                            {
                                action:"REJECTED",
                                rejection_type:selectedType,
                                rejection_reason:"Not Selected"
                            }
                        );
                        setSelectedAppId(null);
                        setSelectedType("");
                        fetchApplications();
                    }}
                >
                    Confirm Reject
                </button>
            </div>
        )}
      </div>
    </>
  )
}

export default AdminApplications
