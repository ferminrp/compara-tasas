import React, { useState, useEffect, useRef } from 'react'
import MenuItem, { type itemDataType } from './MenuItem'

const items: itemDataType[] = [
  {
    name: 'INICIO',
    url: '/',
    icon: '📊'
  },
  /*   {
    name: 'PESOS',
    url: '/pesos',
    icon: '🧉'
  },
  {
    name: 'DÓLARES',
    url: '/dolares',
    icon: '💵'
  }, */
  {
    name: 'CRYPTO',
    url: '/crypto',
    icon: '⚡'
  },
  {
    name: 'AVISO LEGAL',
    url: '/legal',
    icon: '⚖️',
    hasTopBorder: true
  }
]

const MenuDropdown = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>()

  const activeItem = items.find((item) => item.url === pathname)

  /** Cierra el menu si el usuario clickea
   * cualquier otro lugar luego de abrirlo */
  const handleOpenMenu = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node) && isOpen) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOpenMenu)
    return () => document.removeEventListener('mousedown', handleOpenMenu)
  }, [handleOpenMenu])

  return (
    <div className='relative flex flex-col'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center gap-1 text-gray-400'
      >
        <div className='flex content-between gap-2'>
          <span>{activeItem.icon}</span>
          <span className='font-semibold'>{activeItem.name}</span>
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
      {isOpen && (
        <div
          ref={menuRef}
          className='w-[50%] min-w-[200px] max-w-[300px] flex flex-col rounded-lg border-[#CAD0E0] dark:border-[#292B2E] border-[1px] bg-gray-100 dark:bg-gray-900 absolute top-0 right-0'
        >
          <ul className='flex flex-col gap-3 content-between items-center py-2'>
            {items.map((item, index) => (
              <MenuItem
                key={index}
                active={item.url === pathname}
                data={item}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown
