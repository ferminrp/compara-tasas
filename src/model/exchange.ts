import type { Investment } from './business'

export interface Exchange {
  logo: string
  link: string
  altLogo: string
  name: string
  data: Investment[]
}
