import React from 'react'

const GradientButton = ({children,onClick,type="button"}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className='
        px-6 py-2
        rounded-xl
        bg-gradient-to-r
        from-pink-500
        via-purple-500
        to-indigo-500
        text-white
        font-semibold
        shadow-lg
        hover:scale-105
        transition
        duration-300
        '
    >
        {children}
    </button>
  )
}

export default GradientButton
