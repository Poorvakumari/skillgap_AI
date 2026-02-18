import React, { useEffect, useState } from 'react';
import DashboardCard from '../admin/DashboardCard';
import { Loader2,Layers,Clock,CheckCircle,XCircle, } from 'lucide-react' ;
import UserLayout from './UserLayout';
import axios from 'axios';

const UserDashboard = () => {
  const [stats,setStats]=useState(null);
  const [error,setError]=useState(null);
  useEffect(()=>{
    const token=localStorage.getItem("access_token");
    axios.get("http://127.0.0.1:8000/api/user/dashboard/",{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    .then((res)=>{
      console.log("User Dashboard Data:",res.data);
      setStats(res.data)})
    .catch((err)=>{
      console.error(err);
      setError("Failed to load dashboard.Please Login again.");
    });
  },[]);
  if(error){
    return(
      <UserLayout>
        <div className='text-red-600'>{error}</div>
      </UserLayout>
    );
  }
  if (!stats){
    return(
      <UserLayout>
        <div className='flex justify-center items-center h-64'>
          <Loader2 className='animate-spin w-8 h-8' />
        </div>
      </UserLayout>
    )
  }
  return (
    <>
      
        <h1 className='text-2xl font-bold mb-6'>
          My Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Applications"
            value={stats.total_applications}
            icon={<Layers size={28} />}
            color="bg-indigo-600"
          />
          <DashboardCard
            title="Pending Applications"
            value={stats.pending_applications}
            icon={<Clock size={28} />}
            color="bg-yellow-500"
          />
          <DashboardCard 
            title="Approved Applications"
            value={stats.approved_applications}
            icon={<CheckCircle size={28} />}
            color="bg-green-600"
          />
          <DashboardCard
            title="Rejected Applications"
            value={stats.rejected_applications}
            icon={<XCircle size={28} />}
            color="bg-red-600"
          />
        </div>
      
    </>
  )
}

export default UserDashboard
