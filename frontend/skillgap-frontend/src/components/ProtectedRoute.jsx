import React from 'react'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const ProtectedRoute = ({children,adminOnly=false}) => {
    const token=localStorage.getItem("access_token");
    if (!token){
        return <Navigate to="/" replace />;
    }
    try{
        const decoded=jwtDecode(token);
        if(adminOnly && !decoded.is_staff){
            return <Navigate to="/user/dashboard" replace />;
        }
        return children;
    } catch (err){
        localStorage.clear();
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute
