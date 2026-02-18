import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
const Login = ({onLogin}) => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://127.0.0.1:8000/api/token/",{
                email:email,
                password:password,
        });
            
            
            localStorage.setItem("access_token",res.data.access);
            localStorage.setItem("refresh_token",res.data.refresh);
            const decoded=jwtDecode(res.data.access);
            console.log("JWT PAYLOAD:", decoded);
            if(decoded.is_staff){
                navigate('/admin');
            } else {
                navigate('/user/dashboard');
            }
            onLogin && onLogin();
        } catch(err){
            if(err.response?.status===401){
                setError("User not found.Please Sign up first.");
        } else{
            setError("Something went wrong. Try again.")
        }
    }
    };
    useEffect(()=>{
        setEmail("");
        setPassword("");
        setError(null);
    },[]);
  return (
    <>
        <div className='min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center'>
            <form autoComplete='off' onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[380px] text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-300 mb-4 text-sm text-center">{error}</p>}
                <input 
                    type="email"
                    name="email"
                    autoComplete='off'
                    placeholder='Email'
                    className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    name='password'
                    autoComplete='off'
                    placeholder='Password'
                    className='w-full p-3 mb-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition">
                    Login
                </button>
                <p className="text-sm text-center mt-6 text-white/100">
                    New user?
                    <Link to="/signup" className='ml-2 text-pink-300 hover:underline'>
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    </>
  )
}

export default Login
