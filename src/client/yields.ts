import { YIELDS_DATA } from '../data/yieldsData';
import type { BestCoin } from '../model/business';

type YieldPath = 'yields' | 'best-yields' | 'best-yields-coin';

export interface Yield {
  id: string;
  timestamp: string;
  chain: string;
  project: string;
  coin: string;
  apy: number;
  tvlUsd: number;
}

export interface FormattedYield {
  [key: Yield['chain']]: Yield[];
}

const generateUrl = (path: YieldPath) =>
  `https://crypto-defi-yields.adriel-ignacio.workers.dev/api/${path}`;

export const getBestYields = async (): Promise<Yield[]> => {
  const response = await fetch(generateUrl('best-yields'));
  const yields = await response.json();

  return yields.map((x) => ({ ...x, ...YIELDS_DATA[x.project] }));
};

export const getYields = async (): Promise<FormattedYield> => {
  const response = await fetch(generateUrl('yields'));
  const yields = await response.json();

  return yields;
};

export const getOptions = async (): Promise<BestCoin[]> => {
  const response = await fetch(generateUrl('best-yields-coin'));
  const options = await response.json();

  return options;
};
