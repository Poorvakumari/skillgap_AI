import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loader2, PlusCircle } from 'lucide-react';

const AddSkill = () => {
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [level,setLevel]=useState("beginner");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const navigate=useNavigate();
  const token=localStorage.getItem("access_token");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError(null);
    if (!name.trim()){
      setError("Skill name is required");
      return;
    }
    try{
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/user/skills/",{
        name,
        level,
      },
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    });
    navigate("/user/my-skills");
    } catch(err){
      console.error(err);
      setError("Failed to add skill.Please try again.");
    } finally{
      setLoading(false);
    }
  };
  return (
    <>
      
        <div className="max-w-lg mx-auto mt-10 bg-white/10 backdrop-blur-xl 
          border border-white/20 p-8 rounded-2xl shadow-xl text-white">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <PlusCircle className='w-6 h-6' />
            Add New Skill
          </h1>
          {error && (
            <p className='text-red-600 mb-3 text-sm'>
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Skill Name *
              </label>
              <input 
                type="text" 
                value={name}
                placeholder='e.g. React,Python,SQL'
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-black"
                onChange={(e)=>setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Level
              </label>
              <select 
                className='border rounded-lg p-2 w-full text-black'
                value={level}
                onChange={(e)=>setLevel(e.target.value)}
                disabled={loading}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            {/* <div>
              <label className='block text-sm font-medium mb-1'>
                Description (optional)
              </label>
              <textarea
                placeholder='Breif description about your skill'
                className="border rounded-lg p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-black"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                disabled={loading}
              />
            </div> */}
            <button
              type='submit'
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
              disabled={loading}
            >
              {loading ?(
                <>
                  <Loader2 className='animate-spin w-4 h-4' />
                  Adding...
                </>
              ):(
                "Add Skill"
              )}

            </button>
          </form>
        </div>
      
    </>
  )
}

export default AddSkill
