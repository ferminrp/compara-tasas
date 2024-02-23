import React from 'react'
import Drawer from '../Drawer'
import MenuDropdown from './MenuDropdown'

const NavBar = () => {
  return (
    <div className='w-full mx-auto sm:px-4 sm:max-w-sm md:max-w-md lg:max-w-lg'>
      <div className='py-4'>
        <div className='border-l-[3px] border-indigo-500 text-neutral-900 dark:text-white flex items-center justify-between px-4 sm:pl-4 sm:pr-0'>
          <div className='flex flex-col font-semibold'>
            <span>COMPARA</span>
            <span>TASAS</span>
            <span className='dark:text-gray-400'>.AR</span>
          </div>
          <MenuDropdown />
        </div>
      </div>
    </div>
  )
}

export default NavBar
