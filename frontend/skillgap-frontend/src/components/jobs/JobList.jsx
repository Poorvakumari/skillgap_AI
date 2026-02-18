import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import JobCard from './JobCard';

const JobList = () => {
    const [jobs,setJobs]=useState([]);
    const[loading,setLoading]=useState(true);
    const[page,setPage]=useState(1);
    const [next,setNext]=useState(null);
    const [previous,setPrevious]=useState(null);


    useEffect(()=>{
        api.get(`/jobs/list/?page=${page}`)
        .then((res)=>{
          setJobs(res.data.results || []);
          setNext(res.data.next);
          setPrevious(res.data.previous);

        })
        .catch(err=>console.error(err))
        .finally(()=>setLoading(false));
    },[page]);
    if (loading) return <p>Loading jobs...</p>;
  return (
    <>
      <div className='text-white space-y-8'>
        <h1 className="text-3xl font-bold">Available Jobs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job=>(
                <JobCard key={job.id} job={job} />
            ))}
        </div>
            <div className='flex justify-center gap-4 mt-8'>
                {previous && (
                    <button
                        onClick={()=>setPage(page-1)}
                        className='px-6 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition'
                    >
                        Previous
                    </button>
                )}
                {next &&(
                    <button
                        onClick={()=>setPage(page+1)}
                        className='px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition'
                    >
                        Next
                    </button>
                )}
            </div>
      </div>
    </>
  )
}

export default JobList
