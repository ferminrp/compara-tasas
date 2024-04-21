import type { MenuItemType } from '../model/menu';

export const menuItemsData: MenuItemType[] = [
  {
    name: 'INICIO',
    url: '/',
    icon: '📊',
  },
  {
    name: 'PESOS',
    url: '/pesos',
    icon: '🧉',
  },
  /*
    {
      name: 'DÓLARES',
      url: '/dolares',
      icon: '💵'
    }, */
  {
    name: 'CRYPTO CEFI',
    url: '/crypto-cefi',
    icon: '⚡',
  },
  {
    name: 'CRYPTO DEFI',
    url: '/crypto-defi',
    icon: '💰',
  },
  {
    name: 'Cuentas USA',
    url: '/cuentas-usa',
    icon: '🗽',
  },
  {
    name: 'Cobros',
    url: '/cobros',
    icon: '🛒',
  },
  {
    name: 'AVISO LEGAL',
    url: '/legal',
    icon: '⚖️',
    hasTopBorder: true,
  },
];
