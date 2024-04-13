import banks from '../data/banks.json';
import type {
  BankJsonData,
  FullBankData,
  PlazoFijoResponse,
} from '../model/business';

interface mergedBankData
  extends Omit<PlazoFijoResponse, 'entidad' | 'logo'>,
    BankJsonData {}

const apiEndpoint =
  'https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo';

/* Respuesta API:
[
  {
    "entidad": "string",
    "logo": "string",
    "tnaClientes": "number",
    "tnaNoClientes": "number"
  }
]
*/

const getPFData = async (): Promise<PlazoFijoResponse[]> => {
  const response = await fetch(apiEndpoint);
  const data = await response.json();

  const filteredList = data.filter((fund) => {
    const normalizedEntity = fund.entidad.trim().toUpperCase();
    return banks.some((bank) => bank.entidad === normalizedEntity);
  });

  return filteredList;
};

const replacePFData = (rawData: PlazoFijoResponse[]): mergedBankData[] => {
  const newData: mergedBankData[] = [];

  for (const fund of rawData) {
    const normalizedEntity = fund.entidad.trim().toUpperCase();
    const matchBank = banks.find(
      (b) => b.entidad === normalizedEntity,
    ) as BankJsonData;
    // quitar propiedades repetidas (entidad, logo)
    // porque ya existen en el json
    const { entidad, logo, ...clearedFund } = fund;
    if (matchBank) {
      newData.push({ ...clearedFund, ...matchBank });
    }
  }

  return newData;
};

const composePFData = (data): FullBankData => {
  const tem = (1 + data.tnaClientes / 12) ** 1 - 1;
  const dailyRate = ((1 + tem) ** (1 / 30) - 1) * 100;
  const tea = ((1 + data.tnaClientes / 12) ** 12 - 1) * 100;
  const tna = data.tnaClientes * 100;
  const pfInvestment: FullBankData = {
    name: data.nombre as string,
    tasa_diaria: dailyRate,
    display: true,
    full_liquidity: false,
    detail: 'Plazo fijo a 30 días',
    tna: tna,
    tea: tea,
    ...data,
  };

  return pfInvestment;
};

export const getPFInvestments = async (): Promise<FullBankData[]> => {
  const rawData = await getPFData();
  const data = replacePFData(rawData);
  const InvestmentList: FullBankData[] = [];

  for (const fund of data) {
    InvestmentList.push(composePFData(fund));
  }

  return InvestmentList;
};
