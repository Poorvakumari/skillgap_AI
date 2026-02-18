import { Briefcase, BriefcaseBusiness,  LayoutDashboard, LogOut, Users } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate("/");
    };
  return (
    <>
      <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/20 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 tracking-wide">Admin Panel</h2>
        <nav className="space-y-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300">
                <LayoutDashboard /> Dashboard
            </Link>

            <Link to='jobs' className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <Briefcase/>Jobs
            </Link>

            <Link to="applications" className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300'>
                <BriefcaseBusiness/> Job Applications
            </Link>
            
            {/* <Link to="pending-skills" className="flex items-center gap-2">
                <ClipboardCheck /> Pending Skills
            </Link> */}

            <Link to="users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition duration-300">
                <Users /> Users
            </Link>
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/30 text-red-300 mt-6 transition duration-300">
                <LogOut />Logout
            </button>
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar
