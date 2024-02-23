import React, { useState, useEffect, useRef } from 'react'
import MenuItems from './MenuItems'

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>()

  const handleOpenMenu = (e) => {
    if (!menuRef.current?.contains(e.target) && isOpen) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOpenMenu)
  }, [handleOpenMenu])

  return (
    <div className='flex flex-col'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center gap-1 text-gray-400'
      >
        <div className='flex content-between gap-2'>
          <span>📊</span>
          <span className='font-semibold'>INICIO</span>
        </div>
        <svg
          class='w-2.5 h-2.5 m-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
      {isOpen ? (
        <div
          ref={menuRef}
          className='w-[50%] flex flex-col rounded-lg border-[#CAD0E0] dark:border-[#292B2E] border-[1px] bg-gray-100 dark:bg-gray-900 fixed top-8 right-4'
        >
          <MenuItems />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default MenuDropdown
