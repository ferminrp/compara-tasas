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
    logo: 'https://ik.imagekit.io/ferminrp/gKj3U76V_400x400.jpg?updatedAt=1702030494696',
    altLogo: 'Ethereum Logo',
  },
};
