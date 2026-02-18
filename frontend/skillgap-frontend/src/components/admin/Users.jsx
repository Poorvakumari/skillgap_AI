import axios from 'axios';
import  {  useEffect, useState } from 'react'
// import AdminLayout from './AdminLayout';
import ConfirmModal  from './ConfirmModal';

const Users = () => {
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[currentPage,setCurrentPage]=useState(1);
    const USERS_PER_PAGE=5;

    const[showModal,setShowModal]=useState(false);
    const[selectedUser,setSelectedUser]=useState(null);
    const[actionType,setActionType]=useState("");
    const[actionLoading,setActionLoading]=useState(false);
    useEffect(()=>{
        fetchUsers();
    },[]);
    const fetchUsers=async()=>{
        try{
            const token=localStorage.getItem("access_token");
            const res=await axios.get("http://127.0.0.1:8000/api/admin/users/",{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
            );
            setUsers(res.data);
        } catch(err){
            console.error("Error fetching users",err)
        } finally{
            setLoading(false);
        }
    };

    const filteredUsers=users.filter((user)=>
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages=Math.ceil(filteredUsers.length/USERS_PER_PAGE);
    const startIndex=(currentPage-1) *USERS_PER_PAGE;
    const paginatedUsers=filteredUsers.slice(
        startIndex,
        startIndex+USERS_PER_PAGE
    );

    const handleConfirmAction=async()=>{
        if(!selectedUser) return;
        setActionLoading(true);
        const token=localStorage.getItem("access_token");
        try{
            if(actionType==="status"){
                await axios.post(
                `http://127.0.0.1:8000/api/admin/users/${selectedUser.id}/toggle-status/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            if(actionType==="role"){
                await axios.post(
                `http://127.0.0.1:8000/api/admin/users/${selectedUser.id}/toggle-role/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            fetchUsers();
        } catch(err){
            alert("Action failed");
        } finally{
            setActionLoading(false);
            setShowModal(false);
            setSelectedUser(null);
            setActionType("");
        }
    };
  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold ">User Management</h1>
            <input 
                type="text" 
                placeholder='Search by email...' 
                value={search}
                onChange={(e)=>{
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className='bg-white/10 backdrop-blur-xl border border-white/20
                px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500'
            />
        </div>
        {loading ? (
            <p className='text-white/70'>Loading Users...</p>
        ):(
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <table className="w-full text-left">
                    <thead className='bg-white/5 text-white/80'>
                        <tr>
                            <th className='p-4 border'>ID</th>
                            <th className='p-4 border'>Email</th>
                            <th className='p-4 border'>Role</th>
                            <th className='p-4 border'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user)=>(
                            <tr key={user.id} className='border-t border-white/10 hover:bg-white/5 transition'>
                                <td className='p-4 border'>{user.id}</td>
                                <td className='p-4 border'>{user.email}</td>
                                <td className="p-4 border text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                            user.role === "ADMIN"
                                                ? "bg-purple-500/20 text-purple-300"
                                                : "bg-blue-500/20 text-blue-300"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                        <button
                                            onClick={()=>{
                                                setSelectedUser(user);
                                                setActionType("role")
                                                setShowModal(true);
                                            }}
                                            className='text-pink-300 text-sm hover:underline'
                                        >
                                            Change Role
                                        </button>
                                    </div>
                                </td>
                                <td className='p-3 border'>
                                    <button
                                        onClick={()=>{
                                            setSelectedUser(user);
                                            setActionType("status")
                                            setShowModal(true);
                                        }}
                                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                            user.is_active 
                                            ? "bg-red-500/20 text-red-300"
                                            : "bg-green-500/20 text-green-300"
                                        }`}
                                    >
                                        {user.is_active ? "Block":"Unblock"}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {paginatedUsers.length===0 &&(
                            <tr>
                                <td colSpan={4} className='p-6 text-center text-white/60'>
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className='flex justify-between items-center p-6'>
                    <button
                        onClick={()=>
                            setCurrentPage((p)=>Math.max(p-1,1))
                        }
                        disabled={currentPage===1}
                        className='px-5 py-2 bg-white/10 rounded-xl disabled:opacity-40'>
                        Previous
                    </button>
                    <span className='text-white/80'>
                        Page {currentPage} of {totalPages || 1}
                    </span>

                    <button 
                        onClick={()=>
                            setCurrentPage((p)=>
                            Math.min(p+1,totalPages)
                    )
                    }
                    disabled={currentPage===totalPages || totalPages===0}
                    className='px-5 py-2 bg-white/10 rounded-xl disabled:opacity-40'
                    >
                        Next
                    </button>
                </div>
            </div>
        )}
        <ConfirmModal
            isOpen={showModal}
            title='Confirm Action'
            message={
                actionType==="status"
                ? `Are you sure you want to ${
                    selectedUser?.is_active ? "block":"unblock"
                } this user?`
                :"Are you sure you want to change this user's role?"
            }
            confirmText='Yes, Proceed'
            loading={actionLoading}
            onCancel={()=>setShowModal(false)}
            onConfirm={handleConfirmAction}
            />
      
    </>
  )
}

export default Users
