import React from 'react'

const MenuItem = ({ active }: { active: boolean }) => {
  return (
    <li
      className={`${active && 'bg-indigo-500'} px-6 py-3 flex items-center w-full hover:bg-indigo-500 group`}
    >
      <span className='pr-5'>📊</span>
      <a
        className={`${active ? 'text-white' : 'text-gray-400'} font-semibold group-hover:text-white`}
        href='/'
      >
        INICIO
      </a>
    </li>
  )
}

export default MenuItem
