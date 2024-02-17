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

export interface EnrichedReturn extends Return {
  logo: string
}
