export type Rate = 'TNA' | 'TEA';
export type Currency = 'Pesos' | 'Dólares';
export type IncomeType = 'Fija' | 'Variable' | 'Mixta';
export type FullInvestmentData = InvestmentJsonData & Omit<Investment, 'url'>;

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
}

export interface FCIResponse {
  fondo: string;
  fecha: string;
  vcp: number;
  ccp: number;
  patrimonio: number;
  horizonte: string;
}

export interface InvestmentJsonData {
  nombreOficial: string;
  nombreSimplificado: string;
  logo: string;
  url: string;
  type: InvestmentType;
  renta: IncomeType;
  horario: string;
  sociedad: string;
  moneda: Currency;
  montoMinimo: string;
  plazoMinimo: string;
  slug: string;
  description: string;
}

export interface FCIData {
  fondo: string;
  horizonte: string;
  ultimaFecha: string;
  ultimoValorvcp: number;
  penultimoValorvcp: number;
  dias: number;
}
