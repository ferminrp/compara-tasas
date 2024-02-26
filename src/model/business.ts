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
