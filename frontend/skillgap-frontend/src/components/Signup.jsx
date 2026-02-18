import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate();

    const handleSignup=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/api/register/",{
                email,
                password,
            });
            navigate("/");
        } catch(err){
            setError("User already exists.");
        }
    };
    useEffect(()=>{
      setEmail("");
      setPassword("");
    },[]);
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center'>
        <form autoComplete='off' onSubmit={handleSignup} className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[380px] text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
          {error && <p className="text-red-300 mb-4 text-sm text-center">{error}</p>}
          <input 
            type="email" 
            name='signup-email' 
            autoComplete='off'
            value={email} 
            placeholder='Email'
            className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400" 
            onChange={(e)=>setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            name='signup-password' 
            autoComplete='new-password' 
            value={password} 
            placeholder='Password' 
            className="w-full p-3 mb-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400" 
            onChange={e=>setPassword((e).target.value)} 
          />
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Sign Up
          </button>
          <p className="text-sm text-center mt-6 text-white/100">
              Already have account?
          <Link to="/" className='ml-2 text-pink-300 hover:underline'>
              Login
          </Link>
      </p>
      </form>
      </div>
    </>
  )
}

export default Signup
