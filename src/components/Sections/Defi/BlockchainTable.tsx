import React from 'react';
import type { FormattedYield, Yield } from '../../../client/yields';
import { BLOCKCHAINS } from '../../../data/yieldsData';
import DefiRow from './DefiRow';

interface Props {
  chain: string;
  yields: Yield[];
}

const BlockchainTable = ({ chain, yields }: Props) => {
  const blockchain = BLOCKCHAINS[chain];

  const sortedYields = yields.sort((a, b) => b.apy - a.apy);
  return (
    <div className='flex flex-col rounded-lg border-gray-300 bg-white px-4 py-2 shadow-sm dark:bg-gray-900'>
      <div className='border-b-1 border-b border-gray-300 py-4 dark:border-gray-700'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex items-center gap-2'>
            <img
              loading='lazy'
              style={{ width: '32px', height: '32px' }}
              className='y-8 w-8 rounded-full'
              width='32'
              height='32'
              src={blockchain.logo}
              alt={blockchain.altLogo}
            />
            <div>
              <p className='font-semibold capitalize dark:text-gray-200'>
                {blockchain.name}
              </p>
            </div>
          </div>
          {/* <a href="" className='bg-white px-4 py-1 text-sm text-indigo-600 underline dark:bg-gray-900 dark:text-indigo-500'>
            Ver comisiones
          </a> */}
        </div>
      </div>
      {sortedYields.map((x, i) => (
        <DefiRow {...x} isLastItem={i === sortedYields.length - 1} key={x.id} />
      ))}
    </div>
  );
};

export default BlockchainTable;
