import React from 'react';
import type { MenuItemType } from '../../model/menu';
import cn from '../../utils/cn';

const MenuItem = ({
  active,
  data,
  disabled,
}: {
  /** Determina si el item esta activo o no en el momento **/
  active: boolean;
  /** Contiene un objecto ItemDataType con los datos del item  */
  data: MenuItemType;
  disabled: boolean;
}) => {
  const { hasTopBorder, url, icon, name } = data;
  return (
    <>
      {hasTopBorder && (
        <hr className='h-px w-full border-0 bg-[#CAD0E0] dark:bg-[#292B2E]' />
      )}

      <a
        className={cn(
          'w-full px-6 py-3 font-semibold first:rounded-t-lg last:rounded-b-lg',
          {
            'bg-indigo-500 text-white': active,
            'text-[#6E727A] hover:bg-gray-100 group-hover:text-[#6E727A] dark:hover:bg-gray-950':
              !active,
            'pointer-events-none': disabled,
          },
        )}
        href={url}
      >
        <span className='pr-5'>{icon}</span> {name}
      </a>
    </>
  );
};

export default MenuItem;
