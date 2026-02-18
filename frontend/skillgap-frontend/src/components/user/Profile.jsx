import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import SkillsSummary from './SkillsSummary';

const Profile = () => {
    const [profile,setProfile]=useState(null);
    const[loading,setLoading]=useState(true);
    const [editing,setEditing]=useState(false);
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[image,setImage]=useState(null);
    // const [skillsSummary,setSkillsSummary]=useState(null);

    useEffect(()=>{
        fetchProfile();
        // fetchSkillsSummary();
    },[]);
    const fetchProfile=async()=>{
        try{
            const res=await api.get('/user/profile/');
            setProfile(res.data);
            setFirstName(res.data.first_name || "");
            setLastName(res.data.last_name || "");
        } catch(error){
            console.error("Profile fetch error",error);
        } finally{
            setLoading(false);
        }
    };
    const handleUpdate=async()=>{
        const formData=new FormData();
        formData.append("first_name",firstName);
        formData.append("last_name",lastName);
        if (image) formData.append("profile_image",image);
        try{
            await api.put('/user/profile/',formData,{
                headers:{"Content-Type":"multipart/form-data"},
            });
            setEditing(false);
            fetchProfile();
        } catch(err){
            console.error(err);
        }
    };

    // const fetchSkillsSummary=async()=>{
    //     try{
    //         const res=await api.get('/user/skills-summary/');
    //         setSkillsSummary(res.data);
    //     } catch(err){
    //         console.error("Skills summary error",err);
    //     }
    // };
    if (loading) return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;
  return (
    <>
      <div className="text-white space-y-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex items-center gap-6 shadow-2xl">
            <img
                src={
                    profile.profile_image ||
                    `https://ui-avatars.com/api/?name=${profile.first_name || "user"}`
                }
                alt='Profile'
                className='w-24 h-24 rounded-full object-cover border-4 border-white/20'
            />
            {/* <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                {profile.first_name
                ? profile.first_name[0].toUpperCase()
                : profile.email[0].toUpperCase()}
            </div> */}
            <div>
                <h2 className="text-2xl font-bold">
                    {profile.first_name || "User"} {profile.last_name || ""}
                </h2>
                <p className="text-black-600">{profile.email}</p>
                {/* <p className="text-sm text-gray-500">
                    Joined on {profile.date_joined?.slice(0,10)}
                </p> */}
            </div>
            <button 
                onClick={()=>setEditing(true)}
                className='ml-auto bg-black text-white px-4 py-2 rounded'
            >
                Edit Profile
            </button>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-6">Profile Details</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                    <p className='text-white/60'>First Name</p>
                    <p className='font-medium'>{profile.first_name || "-"}</p>
                </div>
                <div>
                    <p className='text-white/60'>Last Name</p>
                    <p className='font-medium'>{profile.last_name || "-"}</p>
                </div>
                <div>
                    <p className='text-white/60'>Email</p>
                    <p className='font-medium'>{profile.email}</p>
                </div>
                <div>
                    <p className="text-white/60">Account Created</p>
                    <p className="font-medium">
                        {profile.date_joined?.slice(0,10)}
                    </p>
                </div>
            </div>
        </div>

        {editing && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className='bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl w-[420px] shadow-2xl'>
                    <h3 className="text-xl font-bold mb-6 text-white">Edit Profile</h3>
                    <input 
                        type="text"
                        placeholder='First Name'
                        className='w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400'
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400'
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                    />
                    <input
                        type='file'
                        accept='image/*'
                        onChange={(e)=>setImage(e.target.files[0])}
                        className='w-full text-sm text-white/80 mb-6'
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            className='px-5 py-2 bg-white/10 rounded-xl text-white'
                            onClick={()=>setEditing(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition"
                            onClick={handleUpdate}
                        >
                            Save
                        </button>

                    </div>
                </div>

            </div>
        )}

        {/* {skillsSummary && (
            <div className="bg-white rounded-xl shadow p-6">
                <SkillsSummary summary={skillsSummary} />
            </div>
        )} */}

      </div>
    </>
  )
}

export default Profile
