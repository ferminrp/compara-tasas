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
        className={`${active && 'bg-indigo-500'} w-full hover:bg-indigo-500 group`}
      >
        <a
          className={`${active ? 'text-white' : 'text-gray-400'} px-6 py-3 block font-semibold group-hover:text-white`}
          href={data.url}
        >
          <span className='pr-5'>{data.icon}</span> {data.name}
        </a>
      </li>
    </>
  )
}

export default MenuItem
