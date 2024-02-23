import React from 'react'
import MenuItem from './MenuItem'

const items = [
  {
    name: 'INICIO',
    url: '/',
    icon: '📊'
  },
  {
    name: 'PESOS',
    url: '/',
    icon: '🇦🇷'
  },
  {
    name: 'DÓLARES',
    url: '/',
    icon: 'US'
  }
]

const MenuItems = () => {
  return (
    <ul className='flex flex-col gap-3 content-between items-center py-6'>
      <MenuItem active />
      <MenuItem active={false} />
      <MenuItem active={false} />
    </ul>
  )
}

export default MenuItems
