import React from 'react';
import Logo from '../../assets/Logo';
import MenuDropdown from './MenuDropdown';

const NavBar = ({
  pathname,
}: {
  /** Utiliza la ruta actual para indicar
   * cual item del menu está activo **/
  pathname: string;
}) => {
  return (
    <div className='mx-auto w-full sm:max-w-sm sm:px-4 md:max-w-md lg:max-w-lg'>
      <div className='py-4'>
        <div className='flex items-center justify-between border-l-[3px] border-indigo-500 px-4 text-neutral-900 sm:pl-4 sm:pr-0 dark:text-white'>
          <a href='/'>
            <div className='hidden dark:block'>
              <Logo darkMode />
            </div>
            <div className='dark:hidden'>
              <Logo />
            </div>
          </a>
          <MenuDropdown pathname={pathname} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
