import React from 'react';
import type { MenuItemType } from '../../model/menu';

const MenuItem = ({
  active,
  data,
}: {
  /** Determina si el item esta activo o no en el momento **/
  active: boolean;
  /** Contiene un objecto ItemDataType con los datos del item  */
  data: MenuItemType;
}) => {
  const { hasTopBorder, url, icon, name } = data;
  return (
    <>
      {hasTopBorder && (
        <hr className="bg-[#CAD0E0] dark:bg-[#292B2E] w-full h-px border-0" />
      )}
      <li
        className={`${active && 'bg-indigo-500'} w-full ${
          !active && 'hover:bg-gray-100 dark:hover:bg-gray-950'
        } group`}
      >
        <a
          className={`${
            active ? 'text-white' : 'text-[#6E727A]'
          } px-6 py-3 block font-semibold ${
            !active && 'group-hover:text-[#6E727A]'
          }`}
          href={url}
        >
          <span className="pr-5">{icon}</span> {name}
        </a>
      </li>
    </>
  );
};

export default MenuItem;
