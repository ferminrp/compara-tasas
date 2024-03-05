import React, { useState, useEffect, useRef } from 'react';
import ArrowDown from '../../assets/ArrowDown';
import { menuItemsData } from '../../data/menu';
import MenuItem from './MenuItem';

// TODO: Implementar popover de Shadcn/UI

const MenuDropdown = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>();

  const activeItem = menuItemsData.find((item) => item?.url === pathname);

  /** Cierra el menu si el usuario clickea
   * cualquier otro lugar luego de abrirlo */
  const handleOpenMenu = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node) && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOpenMenu);
    return () => document.removeEventListener('mousedown', handleOpenMenu);
  }, [handleOpenMenu]);

  return (
    <div className='relative flex flex-col'>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center gap-1 text-[#6E727A]'
      >
        <div className='flex content-between gap-2'>
          <span>{activeItem?.icon}</span>
          <span className='font-semibold'>{activeItem?.name}</span>
        </div>
        <ArrowDown />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className='absolute right-0 top-0 flex w-[50%] min-w-[200px] max-w-[300px] flex-col rounded-lg border border-[#CAD0E0] bg-white dark:border-[#292B2E] dark:bg-gray-900'
        >
          <ul className='flex flex-col content-between items-center gap-3'>
            {menuItemsData.map((item) => (
              <MenuItem
                key={item.name}
                active={item.url === pathname}
                data={item}
                disabled={activeItem.name === item.name}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
