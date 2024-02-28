export type Rate = 'TNA' | 'TEA';

export type InvestmentType =
  | 'cuenta_remunerada'
  | 'tradicional'
  | 'pf'
  | 'criptopesos'
  | 'buendolar'
  | 'fiwind';

export interface Investment {
  id?: number;
  name: string;
  tasa_diaria: number;
  logo: string;
  display: boolean;
  full_liquidity: boolean;
  url: string;
  type: InvestmentType;
  detail: string;
  tna: number;
  tea: number;
  title?: string;
}

export interface FCIResponse {
  fondo: string;
  fecha: string;
  vcp: number;
  ccp: number;
  patrimonio: number;
  horizonte: string;
}

export interface FCIWhitelist {
  nombreOficial: string;
  nombreSimplificado: string;
  logo: string;
  url: string;
  type: InvestmentType;
}

export interface FCIData {
  fondo: string;
  horizonte: string;
  ultimaFecha: string;
  ultimoValorvcp: number;
  penultimoValorvcp: number;
  dias: number;
}
