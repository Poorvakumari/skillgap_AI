import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./admin/DashboardCard";
import { Loader2,Layers,Clock,CheckCircle,XCircle } from "lucide-react";
import AdminLayout from "./admin/AdminLayout";
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://127.0.0.1:8000/api/job-applications/admin/dashboard-stats/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error(err);
        setError(
          "Failed to load dashboard. Make sure you are logged in as ADMIN.",
        );
      });
  }, []);
  if (error) {return(<AdminLayout>
     <div className="text-red-600">{error}</div>
     </AdminLayout>);}
  if (!stats){
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      </AdminLayout>
    );
  }

  // const Cards = [
  //   { title: "Total Users", value: stats.total_users },
  //   { title: "Total Skills", value: stats.total_skills },
  //   { title: "Pending Skills", value: stats.pending_skills },
  //   { title: "Approved Skills", value: stats.approved_skills },
  //   { title: "Rejected Skills", value: stats.rejected_skills },
  // ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* <DashboardCard 
          title="Total Users"
          value={stats.total_users}
          icon={<Users size={28}/>}
          color="bg-blue-600"
        /> */}
        <DashboardCard 
          title="Total Applications"
          value={stats.total_applications}
          icon={<Layers size={20}/>}
          color="bg-indigo-600"
        />
        <DashboardCard 
          title="Pending Applications"
          value={stats.pending_applications}
          icon={<Clock size={20}/>}
          color="bg-yellow-500"
        />
        <DashboardCard 
          title="Approved Applications"
          value={stats.approved_applications}
          icon={<CheckCircle size={20}/>}
          color="bg-green-600"
        />
        <DashboardCard 
          title="Rejected Applications"
          value={stats.rejected_applications}
          icon={<XCircle size={20}/>}
          color="bg-red-600"
        />
      </div>
    
    </>
  );
}
