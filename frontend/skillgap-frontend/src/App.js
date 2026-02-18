import './App.css';
import {Routes,Route, Navigate} from "react-router-dom";
import AdminDashboard from './components/AdminDashboard';
// import { useState } from 'react';
// import AdminLogin from './components/AdminLogin';
// import PendingSkills from './components/admin/PendingSkills';
import Users from './components/admin/Users';
import UserDashboard from './components/user/UserDashboard';
import AddSkill from './components/user/AddSkill';
import MySkills from './components/user/MySkills';
import Profile from './components/user/Profile';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';
import UserLayout from './components/user/UserLayout';
import JobList from './components/jobs/JobList';
import MyApplications from './components/jobs/MyApplications';
import AdminLayout from './components/admin/AdminLayout';
import AdminJobList from './components/admin/AdminJobList';
import AdminJobCreate from './components/admin/AdminJobCreate';
import AdminJobSkills from './components/admin/AdminJobSkills';
import JobDetails from './components/jobs/JobDetails';
import AdminApplications from './components/admin/AdminApplications';

function App() {
  // const[isLoggedIn,setIsLoggedIn]=useState(
  //   !!localStorage.getItem("access_token")
  // );
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup />} />

      <Route path='/admin' element={<ProtectedRoute adminOnly={true}> <AdminLayout/> </ProtectedRoute>} >
        <Route index element={<Navigate to='dashboard' />}/>
        <Route path='dashboard' element={<AdminDashboard />}/>
        <Route path='jobs' element={<AdminJobList />} />
        <Route path='jobs/create' element={<AdminJobCreate />}/>
        <Route path='jobs/:jobId/skills' element={<AdminJobSkills />}/>
        <Route path='users' element={ <Users />}/>
        <Route path='applications' element={<AdminApplications />} />
      </Route>

      <Route path='/user' element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path='dashboard' element={<UserDashboard />} />
        <Route path='profile' element={ <Profile /> } />
        <Route path='add-skill' element={<AddSkill /> } />
        <Route path='my-skills' element={<MySkills /> } />
        <Route path='jobs' element={<JobList />} />
        <Route path='jobs/:jobId' element={<JobDetails />}/>
        <Route path='my-applications' element={<MyApplications />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
