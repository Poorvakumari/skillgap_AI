import React from 'react'
import { Home,PlusCircle,List,LogOut, Briefcase, ScanFace, BriefcaseBusinessIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
const UserSidebar = () => {
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/');
    };
  return (
    <>
      <aside className='w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 text-white p-6 flex flex-col'>
        <h2 className='text-2xl font-bold mb-10 tracking-wide'>User Panel</h2>
        <nav className='space-y-4'>
            <Link to="dashboard" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <Home />Dashboard
            </Link>
            <Link to="jobs" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <Briefcase />Jobs
            </Link>
            <Link to="my-applications" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <BriefcaseBusinessIcon />My Applications
            </Link>
            <Link to="add-skill" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <PlusCircle/>Add Skill
            </Link>
            <Link to="my-skills" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <List />My Skills
            </Link>
            <Link to="profile" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <ScanFace/>My Profile
            </Link>
            <button onClick={logout} className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/30 text-red-300 mt-6 transition duration-300'>
                <LogOut size={18}/>Logout
            </button>
        </nav>
      </aside>
    </>
  )
}

export default UserSidebar
