import React from 'react'

const DashboardCard = ({title,value,icon}) => {
  return (
    <>
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 
      shadow-xl hover:scale-105 transition duration-300 text-white">
        <div className="flex justify-between item-center">
          <div>
              <p className="text-base font-medium opacity-70">{title}</p>
              <h2 className="text-5xl font-extrabold mt-2">{value}</h2>
          </div>
          <div className='bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl'>
            {React.cloneElement(icon,{size:20})}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardCard
