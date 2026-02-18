import React from 'react'

const Navbar = ({title}) => {
  return (
    <div className='mb-8 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-white tracking-wide'>
            {title}
        </h1>
    </div>
  )
}

export default Navbar
