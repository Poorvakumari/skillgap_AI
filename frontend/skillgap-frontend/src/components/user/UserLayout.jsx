import React from 'react'
import UserSidebar from './UserSidebar'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'
const UserLayout = ({Children}) => {
  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700">
        <UserSidebar />
        <div className="flex flex-col flex-1">
            <UserHeader />
            <main className='flex-1 p-8 overflow-y-auto'>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 min-h-[85vh] text-white'>
                <Outlet />
              </div>
            </main>
        </div>
      </div>
    </>
  )
}

export default UserLayout
