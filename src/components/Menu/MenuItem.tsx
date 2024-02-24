import React from 'react'

export interface itemDataType {
  name: string
  url: string
  icon: string
  separator?: boolean
}

const MenuItem = ({
  active,
  data,
  onClick
}: {
  active: boolean
  data: itemDataType
  onClick: () => void
}) => {
  return (
    <>
      {data.separator && (
        <span className='border-t-[1px] border-[#CAD0E0] w-full h-[1px]' />
      )}
      <li
        onClick={onClick}
        className={`${active && 'bg-indigo-500'} px-6 py-3 flex items-center w-full hover:bg-indigo-500 group`}
      >
        <span className='pr-5'>{data.icon}</span>
        <a
          className={`${active ? 'text-white' : 'text-gray-400'} font-semibold group-hover:text-white`}
          href={data.url}
        >
          {data.name}
        </a>
      </li>
    </>
  )
}

export default MenuItem
