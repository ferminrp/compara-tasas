export type Rate = 'TNA' | 'TEA';
export type Currency = 'Pesos' | 'Dólares';
export type IncomeType = 'Fija' | 'Variable' | 'Mixta';

// Este tipo de dato lo usamos para los FCI
export type FullInvestmentData = InvestmentJsonData & Omit<Investment, 'url'>;
// Este tipo de dato lo usamos para los plazos fijos
export type FullBankData = Omit<BankJsonData, 'nombre'> &
  Omit<Investment, 'url'>;

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

// Tipos devueltos por la API ArgentinaDatos para los FCI
export interface FCIResponse {
  fondo: string;
  fecha: string;
  vcp: number;
  ccp: number;
  patrimonio: number;
  horizonte: string;
}

// Tipos devueltos por la API ArgentinaDatos para los Plazo Fijo
export interface PlazoFijoResponse {
  entidad: string;
  logo: string;
  tnaClientes: number;
  tnaNoClientes: number;
}

// Define las propiedades y tipos que hay en la lista JSON de los FCI
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

// Define las propiedades y tipos que hay en la lista JSON de los bancos
export interface BankJsonData
  extends Omit<InvestmentJsonData, 'nombreOficial' | 'nombreSimplificado'> {
  entidad: string;
  nombre: string;
}
export interface FCIData {
  fondo: string;
  horizonte: string;
  ultimaFecha: string;
  ultimoValorvcp: number;
  penultimoValorvcp: number;
  dias: number;
}
