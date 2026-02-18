import React from 'react'

const Card = ({children,classname=""}) => {
  return (
    <div
        className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 text-white ${classname}`}
    >
      {children}
    </div>
  )
}

export default Card
