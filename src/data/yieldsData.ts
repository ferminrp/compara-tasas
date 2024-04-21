interface Protocols {
  [key: string]: { logo: string; altLogo: string; project: string };
}

interface Blockchains {
  [key: string]: { logo: string; altLogo: string; name: string };
}

export const PROTOCOLS: Protocols = {
  'yearn-finance': {
    project: 'Yearn',
    logo: 'https://ik.imagekit.io/ferminrp/Yearn%20Finance%20YFI%20logo.png?updatedAt=1713729426620',
    altLogo: 'Yearn Finance Logo',
  },
  lido: {
    project: 'Lido',
    logo: 'https://ik.imagekit.io/ferminrp/lido-finance.png?updatedAt=1713729002642',
    altLogo: 'Lido Finance Logo',
  },
  markerdao: {
    project: 'Maker Dao',
    logo: 'https://ik.imagekit.io/ferminrp/makerdao.png?updatedAt=1713729114174',
    altLogo: 'Maker Dao logo',
  },
  'rocket-pool': {
    project: 'Rocket Pool',
    logo: 'https://ik.imagekit.io/ferminrp/rocketpool.png?updatedAt=1713729204235',
    altLogo: 'Rocket Pool logo',
  },
  'aave-v3': {
    project: 'AAVE',
    logo: 'https://ik.imagekit.io/ferminrp/aave.png?updatedAt=1713729359463',
    altLogo: 'AAVE logo',
  },
  'compound-v3': {
    project: 'Compound',
    logo: 'https://ik.imagekit.io/ferminrp/compound.png?updatedAt=1713729609508',
    altLogo: 'Compound logo',
  },
  agave: {
    project: 'Agave',
    logo: 'https://ik.imagekit.io/ferminrp/agave.jpeg?updatedAt=1713729838069',
    altLogo: 'Agave logo',
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
    logo: 'https://ik.imagekit.io/ferminrp/gnosis.png?updatedAt=1713729712465',
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
