import type { MenuItemType } from '../model/menu';

export const menuItemsData: MenuItemType[] = [
  {
    name: 'INICIO',
    url: '/',
    icon: '📊',
  },
  /*   {
      name: 'PESOS',
      url: '/pesos',
      icon: '🧉'
    },
    {
      name: 'DÓLARES',
      url: '/dolares',
      icon: '💵'
    }, */
  {
    name: 'CRYPTO',
    url: '/crypto',
    icon: '⚡',
  },
  {
    name: 'AVISO LEGAL',
    url: '/legal',
    icon: '⚖️',
    hasTopBorder: true,
  },
];
