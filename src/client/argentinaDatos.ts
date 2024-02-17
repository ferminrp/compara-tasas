import type { EnrichedReturn, Return } from '../model/exchange'

const baseUrl = 'https://api.argentinadatos.com/v1/finanzas/rendimientos'

type App = 'letsbit' | 'fiwind' | 'buenbit'

export const getReturnsByApp = async (app: App): Promise<EnrichedReturn[]> => {
  try {
    const response = await fetch(`${baseUrl}/${app}`, {
      method: 'GET'
    })
    const data = (await response.json()) as Return[]
    return data
      .filter((x) => x.apy > 0) // remove coins where apy are 0
      .sort((a, b) => b.apy - a.apy) // sort highest to lowest
      .map((y) => ({
        ...y,
        ...(MAPPING_RETURNS[y.moneda] || {}) // add token logo
      }))
  } catch (e) {
    console.error('An error ocurred trying to fetch data.\nError: ' + e)
    return []
  }
}

const MAPPING_RETURNS = {
  // Missing logos
  // NARS: {}
  // ADA:{}
  // BTC
  // ETH
  // DOT
  // MATIC
  // BNB
  // NUARS
  // AVAX
  // NUPEN
  // NCOP
  // USDM
  DAI: {
    logo: 'https://ik.imagekit.io/ferminrp/dai.png?updatedAt=1706873664303'
  },
  USDP: {
    logo: 'https://ik.imagekit.io/ferminrp/usdp.png?updatedAt=1708125100866'
  },
  USDT: {
    logo: 'https://ik.imagekit.io/ferminrp/tether.png?updatedAt=1706873266645'
  },
  USDC: {
    logo: 'https://ik.imagekit.io/ferminrp/USDC%20Logo.png?updatedAt=1706873507983'
  }
}
