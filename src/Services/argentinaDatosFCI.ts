import fciWhitelist from '../data/fci.json'
import type { Investment, InvestmentType } from '../model/business'

const EndpointFCILast =
  'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/ultimo'
const EndpointFCIpenult =
  'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/penultimo'

interface ArgentinaDatosFCIResp {
  fondo: string
  fecha: string
  vcp: number
  ccp: number
  patrimonio: number
  horizonte: string
}

interface WhiteListFCI {
  nombreOficial: string
  nombreSimplificado: string
  logo: string
  url: string
  type: InvestmentType
}

interface FCIData {
  fondo: string
  horizonte: string
  ultimaFecha: string
  ultimoValorvcp: number
  penultimoValorvcp: number
  dias: number
}

/** Devuelve la informacion de los FCI filtrada por la whitelist */
const getFCIData = async (endpoint) => {
  const response = await fetch(endpoint)
  const data = (await response.json()) as ArgentinaDatosFCIResp[]

  const filteredList: ArgentinaDatosFCIResp[] = []

  for (const fci of Object.keys(fciWhitelist)) {
    const whitelisted = fciWhitelist[fci] as WhiteListFCI
    const found = data.find(
      (dataFCI) => dataFCI.fondo === whitelisted.nombreOficial
    )
    if (found) filteredList.push(found)
  }

  return filteredList
}

/** Devuelve la informacion de ambos endpoints mergeada con la diferencia en días */
const mergedFCIData = async (): Promise<FCIData[]> => {
  const penultList = await getFCIData(EndpointFCIpenult)
  const lastList = await getFCIData(EndpointFCILast)
  const mergedList = []

  lastList.forEach((lastFCI) => {
    const apFCI = penultList.find((f) => lastFCI.fondo === f.fondo)
    const apDate = new Date(apFCI.fecha)
    const lastDate = new Date(lastFCI.fecha)
    const diffDays = Math.floor(
      (lastDate.getTime() - apDate.getTime()) / (1000 * 3600 * 24)
    )

    mergedList.push({
      fondo: lastFCI.fondo,
      horizonte: lastFCI.horizonte,
      ultimaFecha: lastFCI.fecha,
      ultimoValorvcp: lastFCI.vcp,
      penultimoValorvcp: apFCI.vcp,
      dias: diffDays
    })
  })

  return mergedList
}

const calcFCITED = (penultVCP: number, lastVCP: number, diffDays: number) => {
  const TED = Math.pow(lastVCP / penultVCP, 1 / diffDays) - 1
  return TED
}

const calcFCITEA = (TED: number) => {
  const TEA = Math.pow(1 + TED, 365) - 1
  return TEA
}

const calcFCITNA = (TED: number) => TED * 365

export const getFCIInvestments = async (): Promise<Investment[]> => {
  const FCIInvestments: Investment[] = []
  const fciList = await mergedFCIData()

  for (const fci of Object.keys(fciWhitelist)) {
    const whitelisted = fciWhitelist[fci] as WhiteListFCI
    const found = fciList.find(
      (dataFCI) => dataFCI.fondo === whitelisted.nombreOficial
    )
    if (found && found.dias > 0) {
      const TED = calcFCITED(
        found.penultimoValorvcp,
        found.ultimoValorvcp,
        found.dias
      )
      const TEA = calcFCITEA(TED) * 100
      const TNA = calcFCITNA(TED) * 100

      FCIInvestments.push({
        name: fci,
        tasa_diaria: TED * 100,
        logo: whitelisted.logo,
        display: true,
        full_liquidity: false,
        url: whitelisted.url,
        type: whitelisted.type,
        detail: whitelisted.nombreSimplificado,
        tna: TNA,
        tea: TEA
      })
    }
  }

  return FCIInvestments
}
