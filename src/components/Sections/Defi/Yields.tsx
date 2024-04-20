import React from 'react';
import type { FormattedYield } from '../../../client/yields';
import { BLOCKCHAINS } from '../../../data/yieldsData';
// import { YIELDS_DATA } from '../../../data/yieldsData';
import BlockchainTable from './BlockchainTable';

interface Props {
  title?: string;
  subtitle: string;
  yields: FormattedYield;
}

const Yields = ({ title, subtitle, yields }: Props) => {
  return (
    <div className='my-6 flex flex-col gap-4'>
      {title && (
        <div className='flex justify-between'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-gray-300'>
            {title}
          </h2>
        </div>
      )}
      <p className='text-xs text-gray-600 dark:text-gray-400'>
        {subtitle}{' '}
        <a className='underline' href='https://usdc.ar'>
          USDC.AR
        </a>
        .
      </p>
      {Object.entries(yields).map(([chain, yields]) => {
        const chainLogo = BLOCKCHAINS[chain]?.logo;
        if (!chainLogo || !yields.length) return null;
        return <BlockchainTable chain={chain} yields={yields} key={chain} />;
      })}
    </div>
  );
};

export default Yields;
