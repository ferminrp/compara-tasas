import type { FormattedYield } from '../client/yields';

export function filterByCoin(yields: FormattedYield, coin: string) {
  const result = {};
  for (const key in yields) {
    result[key] = yields[key].filter((item) => item.coin === coin);
  }
  return result;
}
