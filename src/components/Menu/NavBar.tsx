import React from 'react'
import Drawer from '../Drawer'
import MenuDropdown from './MenuDropdown'
// @ts-ignore
import LogoLight from '../../assets/logo-light.svg?react'
// @ts-ignore
import LogoDark from '../../assets/logo-dark.svg?react'

const NavBar = ({
  pathname
}: {
  /** Utiliza la ruta actual para indicar
   * cual item del menu está activo **/
  pathname: string
}) => {
  return (
    <div className='w-full mx-auto sm:px-4 sm:max-w-sm md:max-w-md lg:max-w-lg'>
      <div className='py-4'>
        <div className='border-l-[3px] border-indigo-500 text-neutral-900 dark:text-white flex items-center justify-between px-4 sm:pl-4 sm:pr-0'>
          <div className='hidden dark:block'>
            <LogoDark />
          </div>
          <div className='dark:hidden'>
            <LogoLight />
          </div>
          <MenuDropdown pathname={pathname} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
