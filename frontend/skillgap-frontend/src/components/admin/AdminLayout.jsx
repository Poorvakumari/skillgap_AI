import React from 'react'
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet }  from 'react-router-dom';
const AdminLayout = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6 overflow-y-auto">
          <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 min-h-[85vh] text-white'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default AdminLayout
        
