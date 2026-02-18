import React from 'react'

const MainLayout = ({ Children }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-6'>
      <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 min-h-[90vh]'>
        {Children}
      </div>
    </div>
  )
}

export default MainLayout
