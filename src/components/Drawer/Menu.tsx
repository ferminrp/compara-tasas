import React, { type Dispatch, type SetStateAction } from 'react'
import { cn } from '../../utils/cn'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Menu = ({ open, setOpen }: Props) => {
  const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-white transition ease transform duration-300`

  return (
    <button
      className='flex flex-col h-12 w-12 absolute z-[100000] left-6 border-white rounded justify-center items-center group'
      onClick={() => setOpen(!open)}
    >
      <div
        className={cn(genericHamburgerLine, {
          'rotate-45 translate-y-3 opacity-50 group-hover:opacity-100': open,
          'opacity-50 group-hover:opacity-100': !open
        })}
      />
      <div
        className={cn(genericHamburgerLine, {
          'opacity-0': open,
          'opacity-50 group-hover:opacity-100': !open
        })}
      />
      <div
        className={cn(genericHamburgerLine, {
          '-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100': open,
          'opacity-50 group-hover:opacity-100': !open
        })}
      />
    </button>
  )
}

export default Menu
