export interface Exchange {
  logo: string
  link: string
  altLogo: string
  name: string
  data: Return[]
}

export interface Return {
  moneda: string
  apy: number
  fecha: string
}

export type App = 'letsbit' | 'fiwind' | 'buenbit' | 'belo' | 'lemoncash'

export interface ReturnsResponse {
  entidad: App
  rendimientos: Return[]
}
