import React from 'react'

export interface itemDataType {
  /** Nombre del item **/
  name: string
  /** Url al que redirige */
  url: string
  /** Icono del item, se muestra al lado del nombre */
  icon: string
  /** agrega un border-top al item para dividir entre secciones */
  hasTopBorder?: boolean
}

const MenuItem = ({
  active,
  data
}: {
  /** Determina si el item esta activo o no en el momento **/
  active: boolean
  /** Contiene un objecto ItemDataType con los datos del item  */
  data: itemDataType
}) => {
  const { hasTopBorder, url, icon, name } = data
  return (
    <>
      {hasTopBorder && (
        <hr className='bg-[#CAD0E0] dark:bg-[#292B2E] w-full h-px border-0' />
      )}
      <li
        className={`${active && 'bg-indigo-500'} w-full hover:bg-indigo-500 group`}
      >
        <a
          className={`${active ? 'text-white' : 'text-gray-400'} px-6 py-3 block font-semibold group-hover:text-white`}
          href={url}
        >
          <span className='pr-5'>{icon}</span> {name}
        </a>
      </li>
    </>
  )
}

export default MenuItem
