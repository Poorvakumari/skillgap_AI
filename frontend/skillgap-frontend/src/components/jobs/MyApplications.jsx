import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import RoadmapView from './RoadmapView'

const MyApplications = () => {
    const [applications,setApplications]=useState([]);
    const [loading,setLoading]=useState(true);
    const [selectedRoadmap,setSelectedRoadmap]=useState(null);
    const[page,setPage]=useState(1);
    const [next,setNext]=useState(null);
    const [previous,setPrevious]=useState(null);
    useEffect(()=>{
        setLoading(true);
        api.get(`/job-applications/my/?page=${page}`)
        .then((res)=>{
            setApplications(res.data.results);
            setNext(res.data.next);
            setPrevious(res.data.previous);
        })
        .catch((err)=>console.error(err))
        .finally(()=>setLoading(false));
    },[page]);
    if(loading) return <p>Loading Applications...</p>;
  return (
    <>
      <div className='text-white space-y-6'>
        <h1 className="text-3xl font-bold">My Applications</h1>
        {applications.length===0 ? (
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                No applications yet.
            </div>
        ):(
        <div className="space-y-6">
            {applications.map((app)=>(
                <div key={app.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-semibold">{app.job}</h2>
                    <div className='mt-3'>
                        <span className='text-white/100 text-x'>Status:</span>
                        <span
                            className={`ml-3 px-3 py-1 rounded-full text-sm ${
                                app.status==="APPROVED"
                                ? "bg-green-500/20 text-green-300 text-xl"
                                :app.status==="REJECTED"
                                ? "bg-red-500/20 text-red-300 text-xl"
                                :'bg-yellow-500/20 text-yellow-300'
                            }`}
                        >
                            {app.status}
                        </span>
                    </div>
                    {app.status==="APPROVED" && (
                        <p className="mt-3 text-green-800 text-xl">
                            Congratulations! Your application has been approved.
                        </p>
                    )}
                    {app.status==="REJECTED" && (
                        <div className='mt-3'>
                            {app.rejection_reason &&(
                                <p className='text-sm text-gray-600'>Reason:{app.rejection_reason}</p>
                            )}
                            {app.rejection_type==="SKILL_GAP" ?(
                            <button
                                className='mt-2 text-blue-600 hover:text-blue-800 underline text-xl'
                                onClick={()=>setSelectedRoadmap(app.id)}
                            >
                                View Roadmap
                            </button>
                            ):(
                                <p className='text-x text-white/100 mt-4'>
                                    This decision was based on non-technical evaluation criteria.
                                </p>
                            )}
                        </div>
                    )}
                    <p className='text-x text-black-800 mt-3'>
                        Applied on:{" "}
                        {new Date(app.applied_at).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
        )}
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

        {selectedRoadmap && (
            <RoadmapView applicationId={selectedRoadmap} onClose={()=>setSelectedRoadmap(null)} />
        )}
      </div>
    </>
  )
}

export default MyApplications
