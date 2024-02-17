import type { App, Return, ReturnsResponse } from '../model/exchange'

const baseUrl = 'https://api.argentinadatos.com/v1/finanzas/rendimientos'

export const getReturns = async (): Promise<Record<App, Return[]>> => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'GET'
    })
    const data = (await response.json()) as ReturnsResponse[]
    return data.reduce(
      (acc, curr) => {
        return { ...acc, [curr.entidad]: [...curr.rendimientos] }
      },
      {} as Record<App, Return[]>
    )
  } catch (e) {
    console.error('An error ocurred trying to fetch data.\nError: ' + e)
    return {} as Record<App, Return[]>
  }
}
