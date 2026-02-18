import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useParams } from 'react-router-dom'

const AdminJobSkills = () => {
    const {jobId} =useParams();
    const [skills,setSkills]=useState([]);
    const [editingId,setEditingId]=useState(null);
    const [form,setForm]=useState({
        skill_name:"",
        level:"Beginner",
        is_mandatory:true,
    });

    const fetchSkills=async()=>{
        const res=await api.get(`/jobs/admin/${jobId}/skills/`);
        setSkills(res.data);
    };

    useEffect(()=>{
        if(jobId){
            fetchSkills();
        }
    },[jobId]);

    const addSkill=async()=>{
        await api.post(`/jobs/admin/${jobId}/add-skill/`,form);
        setForm({
            skill_name:"",
            level:"Beginner",
            is_mandatory:true,
        });
        fetchSkills();
    };
    const deleteSkill=async(id)=>{
        const confirmDelete=window.confirm("Delete this skill?");
        if (!confirmDelete) return;
        await api.delete(`/jobs/admin/skills/${id}/delete/`);
        fetchSkills();
    };
    const startEdit=(skill)=>{
        setEditingId(skill.id);
        setForm({
            skill_name:skill.skill_name,
            level:skill.level,
            is_mandatory:skill.is_mandatory,
        });
    };
    const updateSkill=async(id)=>{
        await api.put(`/jobs/admin/skills/${id}/update/`,form);
        setEditingId(null);
        setForm({
            skill_name:"",
            level:"Beginner",
            is_mandatory:true,
        });
        fetchSkills();
    }
  return (
    <>
      <div className='space-y-8 text-white'>
        <h2 className="text-3xl font-bold">Required Skills</h2>
        <div className="flex gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
            <input
                placeholder='Skill'
                className='bg-white/10 border border-white/20 px-4 py-2 rounded-xl'
                value={form.skill_name}
                onChange={e=>setForm({...form,skill_name:e.target.value})}
            />
            <select
                className='bg-white/10 border border-white/20 px-4 py-2 rounded-xl'
                onChange={e=>setForm({...form,level:e.target.value})}
            >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>
            <button onClick={addSkill} className="bg-gradient-to-r from-pink-500 to-purple-600 
            px-6 rounded-xl font-semibold">
                Add 
            </button>
        </div>
        <ul className="bg-white/10 backdrop-blur-xl rounded-2xl 
            border border-white/20 overflow-hidden">
            {skills.map(skill=>(
                <li key={skill.id} className='flex justify-between items-center 
                    p-5 border-t border-white/10 hover:bg-white/5 transition'>
                    {editingId===skill.id ? (
                        <div className='flex gap-2'>
                            <input
                                className='font-medium border p-1'
                                value={form.skill_name}
                                onChange={e=>setForm({...form,skill_name:e.target.value})}
                            />
                            <select
                                className='font-medium border p-1'
                                value={form.level}
                                onChange={e=>setForm({...form,level:e.target.value})}
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                            <button
                                onClick={()=>updateSkill(skill.id)}
                                className='text-green-300 hover:underline'
                            >
                                Save
                            </button>
                            <button
                                onClick={()=>setEditingId(null)}
                                className='text-red-300 hover:underline'
                            >
                                Cancel
                            </button>
                        </div>
                    ):(
                        <>
                            <span>
                                {skill.skill_name} - {skill.level}
                            </span>
                            <div className='flex gap-2'>
                                <button
                                    onClick={()=>startEdit(skill)}
                                    className='text-blue-300 hover:underline'
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={()=>deleteSkill(skill.id)}
                                    className='text-red-300 hover:underline'
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default AdminJobSkills
