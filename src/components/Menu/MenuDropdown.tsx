import React, { useState, useEffect, useRef } from 'react'
import MenuItem, { type itemDataType } from './MenuItem'
import { useStore } from '@nanostores/react'
import { $activeItem } from '../../utils/menuStore'

const items: itemDataType[] = [
  {
    name: 'INICIO',
    url: '/',
    icon: '📊'
  },
  {
    name: 'PESOS',
    url: '/',
    icon: '🇦🇷'
  },
  {
    name: 'DÓLARES',
    url: '/',
    icon: 'US'
  }
]

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const activeItem = useStore($activeItem)
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
    <div className='relative flex flex-col'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center gap-1 text-gray-400'
      >
        <div className='flex content-between gap-2'>
          <span>{items[activeItem]?.icon}</span>
          <span className='font-semibold'>{items[activeItem]?.name}</span>
        </div>
        <svg
          className='w-2.5 h-2.5 m-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
      {isOpen ? (
        <div
          ref={menuRef}
          className='w-[50%] min-w-[200px] max-w-[300px] flex flex-col rounded-lg border-[#CAD0E0] dark:border-[#292B2E] border-[1px] bg-gray-100 dark:bg-gray-900 absolute top-0 right-0'
        >
          <ul className='flex flex-col gap-3 content-between items-center py-6'>
            {items.map((item, index) => (
              <MenuItem
                onClick={() => $activeItem.set(index.toString())}
                key={index}
                active={index.toString() === activeItem}
                data={item}
              />
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default MenuDropdown
