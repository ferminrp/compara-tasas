interface Protocols {
  [key: string]: { logo: string; altLogo: string; project: string };
}

interface Blockchains {
  [key: string]: { logo: string; altLogo: string; name: string };
}

export const PROTOCOLS: Protocols = {
  'yearn-finance': {
    project: 'Yearn',
    logo: 'https://ik.imagekit.io/ferminrp/gKj3U76V_400x400.jpg?updatedAt=1702030494696',
    altLogo: 'Yearn Finance Logo',
  },
};

export const BLOCKCHAINS: Blockchains = {
  eth: {
    name: 'Ethereum',
    logo: 'https://ik.imagekit.io/ferminrp/eth-logo?updatedAt=1708168133038',
    altLogo: 'Ethereum Logo',
  },
  arb: {
    name: 'Arbitrum',
    logo: 'https://ik.imagekit.io/ferminrp/arbitrum.webp?updatedAt=1713728759449',
    altLogo: 'Arbitrum Logo',
  },
  poly: {
    name: 'Polygon',
    logo: 'https://ik.imagekit.io/ferminrp/matic.webp?updatedAt=1708167991700',
    altLogo: 'Polygon Logo',
  },
  gnosis: {
    name: 'Gnosis',
    logo: 'https://ik.imagekit.io/ferminrp/gKj3U76V_400x400.jpg?updatedAt=1702030494696',
    altLogo: 'Gnosis Logo',
  },
  base: {
    name: 'Base',
    logo: 'https://ik.imagekit.io/ferminrp/base.png?updatedAt=1713728828750',
    altLogo: 'Base Logo',
  },
  avax: {
    name: 'Avalanche',
    logo: 'https://ik.imagekit.io/ferminrp/avax.png?updatedAt=1708168433703',
    altLogo: 'Avalanche Logo',
  },
  opt: {
    name: 'Optimism',
    logo: 'https://ik.imagekit.io/ferminrp/optimism-ethereum-op-logo.png?updatedAt=1703511056838',
    altLogo: 'Optimism Logo',
  },
};
