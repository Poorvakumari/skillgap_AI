import React, { useState } from 'react'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminJobCreate = () => {
    const navigate=useNavigate();
    const [form,setForm]=useState({
        title:"",
        description:"",
        experience_level:"Fresher",
        location:""

    });
    const handleSubmit=async (e) =>{
        e.preventDefault();
        await api.post('/jobs/admin/create/',form);
        alert("Job created successfully");
        navigate('/admin/jobs');
        
    };
  return (
    <>
      <div className='max-w-2xl mx-auto bg-white/10 backdrop-blur-xl
      border border-white/20 rounded-3xl p-10 text-white shadow-xl'>
        <h2 className="text-3xl font-bold mb-8">Create Job</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
            <input
                placeholder='Job Title'
                onChange={e=>setForm({...form,title:e.target.value})}
                className='w-full bg-white/10 border border-white/20 
                px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none'
            />

            <textarea
                placeholder='Description'
                onChange={e=>setForm({...form,description:e.target.value})}
                className='w-full bg-white/10 border border-white/20 
                px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none'
            />

            <select
                onChange={e=>setForm({...form,experience_level:e.target.value})}
                className='w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl'
            >
                <option>Fresher</option>
                <option >Junior</option>
                <option >Mid</option>
            </select>
            <input
                placeholder='Location'
                className='w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl'
                onChange={e=> setForm({...form,location:e.target.value})}
            />
            <button  className='w-full bg-gradient-to-r from-pink-500 to-purple-600 
                px-6 y-3 rounded-xl font-semibold hover:scale-105 transition'
            >
                Create Job
            </button>
        </form>
      </div>
    </>
  )
}

export default AdminJobCreate
