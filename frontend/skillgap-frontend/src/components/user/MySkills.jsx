import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const MySkills = () => {
  const[skills,setSkills]=useState([]);
  const[loading,setLoading]=useState(true);
  const[editingSkill,setEditingSkill]=useState(null);
  const[editName,setEditName]=useState("");
  const[editLevel,setEditLevel]=useState("");
  const token=localStorage.getItem("access_token");
  useEffect(()=>{
    fetchSkills();
  },[]);
  const fetchSkills=async()=>{
    try{
      const res=await axios.get("http://127.0.0.1:8000/api/user/skills/",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      // console.log("Skills API response",res.data)
      setSkills(res.data);
    } catch(err){
      console.error(err);
    } finally{
      setLoading(false);
    }
  };

  const handleDelete=async(skill_id)=>{
    const skill=skills.find(s=>s.id===skill_id);
    if(skill.status==="APPROVED"){
      alert("Approved skills cannot be deleted.");
      return;
    }
    if(!window.confirm("Are you sure you want to delte this skill?")) return;
    try{
      await axios.delete(`http://127.0.0.1:8000/api/user/skills/${skill_id}/delete/`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      setSkills(skills.filter(skill=>skill.id!==skill_id));
    } catch(err){
      console.error(err);
    }
  };

  const handleUpdate=async()=>{
    try{
      const res=await axios.put(
        `http://127.0.0.1:8000/api/user/skills/${editingSkill.id}/update/`,
        {
          name:editName,
          level:editLevel,
        },
        {
          headers:{Authorization:`Bearer ${token}`},
        }
      );
      setSkills(
        skills.map(skill=>
          skill.id===editingSkill.id ? res.data:skill
        )
      );
      setEditingSkill(null);
    } catch(err){
      console.error(err);
    }
  };
  const getStatusBadege=(status)=>{
    const base="px-3 py-1 rounded-full text-sm font-medium ";
    if(status==="APPROVED") return `${base} bg-green-100 text-green-700`;
    if(status==="REJECTED") return `${base} bg-red-100 text-red-700`;
    return `${base} bg-yellow-100 text-yellow-700`;
  };
  if(loading){
    return <p className="text-center text-gray-500">Loading Skills...</p>
  }
  return (
    <>
    <div className="text-white space-y-6">
      <h1 className="text-3xl font-bold ">My Skills</h1>
      <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl'>
        {skills.length===0 ? (
          <div className="p-8 text-center text-white/70">
            You haven't added skills yet.
          </div>
        ):(
            <table className='w-full'>
              <thead className='bg-white/5 text-white/80 text-sm uppercase tracking-wider'>
                <tr>
                  <th className="p-4 text-left">Skill</th>
                  <th className="p-4 text-left">Level</th>
                  {/* <th className="p-4 text-left">Status</th> */}
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill)=>(
                  <tr key={skill.id} className='border-t border-white/10 hover:bg-white/5 transition'>
                    <td className='p-4 font-medium'>{skill.name}</td>
                    <td className='p-4 capitalize text-white/80'>{skill.level}</td>
                    {/* <td className='p-4'>
                      <span className={getStatusBadege(skill.status)}>
                        {skill.status}
                      </span>
                    </td> */}
                    <td className="p-4 text-center space-x-4">
                      <button
                        className="text-pink-300 hover:text-pink-400 transition"
                        title="Edit Skill"
                        onClick={()=>{
                          setEditingSkill(skill);
                          setEditName(skill.name)
                          setEditLevel(skill.level)
                        }}
                        
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-500 transition"
                        title="Delete Skill"
                        onClick={()=>handleDelete(skill.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
            {editingSkill && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl w-[400px] shadow-2xl">
                  <h2 className="text-xl font-bold mb-6 text-white">Edit Skill</h2>
                  <input 
                    type="text" 
                    className='w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400'
                    value={editName}
                    onChange={(e)=>setEditName(e.target.value)}
                  />
                  <select
                    className="w-full border p-2 rounded mb-4 text-black"
                    value={editLevel}
                    onChange={(e)=>setEditLevel(e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <div className="flex justify-end gap-3">
                    <button
                      className='px-4 py-2 bg-gray-200 rounded'
                      onClick={()=>setEditingSkill(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className='px-4 py-2 bg-blue-600 text-white rounded'
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
        )}
      </div>
    </div>
      
    </>
  )
}

export default MySkills
