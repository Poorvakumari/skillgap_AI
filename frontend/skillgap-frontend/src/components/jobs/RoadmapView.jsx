import React, { useEffect, useState } from 'react'
import api from '../../services/api'
const RoadmapView = ({applicationId,onClose}) => {
    const [roadmap,setRoadmap]=useState(null);

    useEffect(()=>{
        api.get(`/roadmap/application/${applicationId}/`)
        .then(res=>setRoadmap(res.data))
        .catch(err=>console.error(err));
    },[applicationId]);
    if(!roadmap) return <p>Loading Roadmap...</p>
  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 rounded-2xl w-[600px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Why you were rejected</h2>
            <p className="mb-6 text-white/80">{roadmap.message}</p>
            <h3 className="ftext-2xl font-bold mb-4"> Skill Improvement Roadmap</h3>
            <ul className="space-y-4">
                {roadmap.skills.map((skill,index)=>(
                    <li key={index} className='bg-white/10 p-4 rounded-xl'>
                        <strong>{skill.skill_name}</strong> --{skill.recommended_level}
                        {skill.resources && (
                            <p className="text-sm text-white/60 mt-1">{skill.resources}</p>
                        )}
                    </li>
                ))}
            </ul>
            <button
                onClick={onClose}
                className="mt-6 bg-black/40 px-5 py-2 rounded-lg"
            >
                Close
            </button>
        </div>
      </div>
    </>
  )
}

export default RoadmapView
