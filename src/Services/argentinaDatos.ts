import banks from '../data/banks.json';
import type { Investment } from '../model/business';

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

const getPFData = async () => {
  const response = await fetch(apiEndpoint);
  const data = await response.json();

  const filteredList = data.filter((fund) => {
    const normalizedEntity = fund.entidad.trim().toUpperCase();
    return banks.some((bank) => bank.entidad === normalizedEntity);
  });

  return filteredList;
};

const replacePFData = (rawData) => {
  const newData = [];

  for (const fund of rawData) {
    const normalizedEntity = fund.entidad.trim().toUpperCase();
    const matchBank = banks.find((b) => b.entidad === normalizedEntity);
    if (matchBank) {
      fund.nombre = matchBank.nombre;
      fund.logo = matchBank.logo;
      fund.url = matchBank.url;
      newData.push(fund);
    }
  }

  return newData;
};

const composePFData = (data): Investment => {
  const tem = (1 + data.tnaClientes / 12) ** 1 - 1;
  const dailyRate = ((1 + tem) ** (1 / 30) - 1) * 100;
  const tea = ((1 + data.tnaClientes / 12) ** 12 - 1) * 100;
  const tna = data.tnaClientes * 100;
  const pfInvestment: Investment = {
    name: data.nombre as string,
    tasa_diaria: dailyRate,
    logo: data.logo as string,
    display: true,
    full_liquidity: false,
    url: data.url as string,
    type: 'pf',
    detail: 'Plazo fijo a 30 días',
    tna: tna,
    tea: tea,
  };

  return pfInvestment;
};

export const getPFInvestments = async (): Promise<Investment[]> => {
  const rawData = await getPFData();
  const data = replacePFData(rawData);
  const InvestmentList: Investment[] = [];

  for (const fund of data) {
    InvestmentList.push(composePFData(fund));
  }

  return InvestmentList;
};
