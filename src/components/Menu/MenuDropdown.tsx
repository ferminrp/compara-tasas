import React, { useState, useEffect, useRef } from 'react'
import ArrowDown from '../../assets/ArrowDown'
import MenuItem from './MenuItem'
import { menuItemsData } from '../../data/menu'

const MenuDropdown = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>()

  const activeItem = menuItemsData.find((item) => item.url === pathname)

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
        className='flex items-center gap-1 text-[#6E727A]'
      >
        <div className='flex content-between gap-2'>
          <span>{activeItem.icon}</span>
          <span className='font-semibold'>{activeItem.name}</span>
        </div>
        <ArrowDown />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className='w-[50%] min-w-[200px] max-w-[300px] flex flex-col rounded-lg border-[#CAD0E0] dark:border-[#292B2E] border-[1px] bg-white dark:bg-gray-900 absolute top-0 right-0'
        >
          <ul className='flex flex-col gap-3 content-between items-center py-2'>
            {menuItemsData.map((item, index) => (
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
