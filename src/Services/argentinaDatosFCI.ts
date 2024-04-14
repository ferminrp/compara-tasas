import fciWhitelist from '../data/fci.json';
import type {
  FCIData,
  FCIResponse,
  FullInvestmentData,
  InvestmentJsonData,
  OtherFCIResponse,
} from '../model/business';

const EndpointFCILast =
  'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/ultimo';
const EndpointFCIpenult =
  'https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/penultimo';
const OTROS_FCI = 'https://api.argentinadatos.com/v1/finanzas/fci/otros/ultimo';

/** Devuelve la cotización de los FCI filtrada por la whitelist */
const getFCIData = async <T extends { fondo: string }>(endpoint) => {
  const response = await fetch(endpoint);
  const data = (await response.json()) as T[];

  const filteredList: T[] = data.filter((fci) => !!fciWhitelist[fci.fondo]);

  return filteredList;
};

/** Devuelve la informacion de ambos endpoints mergeada, con la diferencia en días */
const mergedFCIData = async (): Promise<FCIData[]> => {
  const penultList = await getFCIData<FCIResponse>(EndpointFCIpenult);
  const lastList = await getFCIData<FCIResponse>(EndpointFCILast);
  const mergedList = [];

  for (const lastFCI of lastList) {
    const apFCI = penultList.find((f) => lastFCI.fondo === f.fondo);

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
  const othersFCI = await getFCIData<OtherFCIResponse>(OTROS_FCI);

  for (const fci of othersFCI) {
    const whitelisted = fciWhitelist[fci.fondo] as InvestmentJsonData;

    FCIInvestments.push({
      name: whitelisted.displayName,
      tasa_diaria: fci.tna / 360,
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
      tna: fci.tna * 100,
      tea: fci.tea * 100,
      slug: whitelisted.slug,
    });
  }

  for (const fci of fciList) {
    const whitelisted = fciWhitelist[fci.fondo] as InvestmentJsonData;

    /* La 2da condición evita que se filtren FCI con información
     * incompleta producto de que algún fondo no haya realizado
     * los reportes correspondientes, la dif en días debe ser > 0 */
    if (fci.dias > 0) {
      const TED = calcFCITED(
        fci.penultimoValorvcp,
        fci.ultimoValorvcp,
        fci.dias,
      );
      const TEA = calcFCITEA(TED) * 100;
      const TNA = calcFCITNA(TED) * 100;

      FCIInvestments.push({
        name: whitelisted.displayName,
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
