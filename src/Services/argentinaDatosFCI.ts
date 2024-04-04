import fciWhitelist from '../data/fci.json';
import type {
  FCIData,
  FCIResponse,
  FullInvestmentData,
  Investment,
  InvestmentJsonData,
} from '../model/business';

const EndpointFCILast =
  'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/ultimo';
const EndpointFCIpenult =
  'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/penultimo';

/** Devuelve la cotización de los FCI filtrada por la whitelist */
const getFCIData = async (endpoint) => {
  const response = await fetch(endpoint);
  const data = (await response.json()) as FCIResponse[];

  const filteredList: FCIResponse[] = [];

  for (const fci of Object.keys(fciWhitelist)) {
    const whitelisted = fciWhitelist[fci] as InvestmentJsonData;
    const found = data.find(
      (dataFCI) => dataFCI.fondo === whitelisted.nombreOficial,
    );
    if (found) filteredList.push(found);
  }

  return filteredList;
};

/** Devuelve la informacion de ambos endpoints mergeada, con la diferencia en días */
const mergedFCIData = async (): Promise<FCIData[]> => {
  const penultList = await getFCIData(EndpointFCIpenult);
  const lastList = await getFCIData(EndpointFCILast);
  const mergedList = [];

  for (const lastFCI of lastList) {
    const apFCI = penultList.find((f) => lastFCI.fondo === f.fondo);

    if (lastFCI.fecha && apFCI && apFCI.fecha) {
      const apDate = new Date(apFCI.fecha);
      const lastDate = new Date(lastFCI.fecha);
      const diffDays = Math.floor(
        (lastDate.getTime() - apDate.getTime()) / (1000 * 3600 * 24),
      );

      mergedList.push({
        fondo: lastFCI.fondo,
        horizonte: lastFCI.horizonte,
        ultimaFecha: lastFCI.fecha,
        ultimoValorvcp: lastFCI.vcp,
        penultimoValorvcp: apFCI.vcp,
        dias: diffDays,
      });
    }
  }

  return mergedList;
};

/** Calcula la Tasa Efectiva Diaria */
const calcFCITED = (penultVCP: number, lastVCP: number, diffDays: number) => {
  const TED = (lastVCP / penultVCP) ** (1 / diffDays) - 1;
  return TED;
};

/** Calcula la Tasa Efectiva Anual */
const calcFCITEA = (TED: number) => {
  const TEA = (1 + TED) ** 365 - 1;
  return TEA;
};

/** Calcula la Tasa Nominal Anual */
const calcFCITNA = (TED: number) => TED * 365;

/** Devuelve el array con toda la información en el formato correspondiente */
export const getFCIInvestments = async (): Promise<FullInvestmentData[]> => {
  const FCIInvestments: FullInvestmentData[] = [];
  const fciList = await mergedFCIData();

  for (const fci of Object.keys(fciWhitelist)) {
    const whitelisted = fciWhitelist[fci] as InvestmentJsonData;
    const found = fciList.find(
      (dataFCI) => dataFCI.fondo === whitelisted.nombreOficial,
    );

    /* La 2da condición evita que se filtren FCI con información
     * incompleta producto de que algún fondo no haya realizado
     * los reportes correspondientes, la dif en días debe ser > 0 */
    if (found && found.dias > 0) {
      const TED = calcFCITED(
        found.penultimoValorvcp,
        found.ultimoValorvcp,
        found.dias,
      );
      const TEA = calcFCITEA(TED) * 100;
      const TNA = calcFCITNA(TED) * 100;

      FCIInvestments.push({
        name: fci,
        tasa_diaria: TED * 100,
        logo: whitelisted.logo,
        nombreSimplificado: whitelisted.nombreSimplificado,
        nombreOficial: whitelisted.nombreOficial,
        description: whitelisted.description,
        renta: whitelisted.renta,
        moneda: whitelisted.moneda,
        horario: whitelisted.horario,
        sociedad: whitelisted.sociedad,
        montoMinimo: whitelisted.montoMinimo,
        plazoMinimo: whitelisted.plazoMinimo,
        display: true,
        full_liquidity: false,
        url: whitelisted.url,
        type: whitelisted.type,
        detail: whitelisted.nombreSimplificado,
        tna: TNA,
        tea: TEA,
        slug: whitelisted.slug,
      });
    }
  }

  return FCIInvestments;
};
