import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("access_token");
    navigate('/');
  };
  return (
    <>
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">User Dashboard</h1>
        <button
            className='ml-auto text-red-300 text-xl hover:underline'
            onClick={handleLogout}
        >
          Logout
        </button>
      </header>
    </>
  )
}

export default UserHeader
