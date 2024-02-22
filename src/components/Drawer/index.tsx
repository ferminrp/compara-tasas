import React, { useState } from 'react'
import Menu from './Menu'
import DrawerContent from './DrawerContent'
import { cn } from '../../utils/cn'

const Drawer = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <Menu open={open} setOpen={setOpen} />
      <div
        className={cn(
          'fixed top-0 left-0 z-20 lg:w-[20%] w-[65%] h-full transition-all duration-500 transform -translate-x-full  bg-gray-100 dark:bg-gray-800 shadow-lg',
          {
            'translate-x-0 shadow-cyan-500/50': open
          }
        )}
      >
        <DrawerContent />
      </div>
    </>
  )
}

export default Drawer
