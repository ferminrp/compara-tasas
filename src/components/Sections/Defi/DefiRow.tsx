import React from 'react';
import { PROTOCOLS } from '../../../data/yieldsData';
import cn from '../../../utils/cn';
import { formatPercentage } from '../../../utils/formats';

interface Props {
  id: string;
  chain: string;
  project: string;
  coin: string;
  apy: number;
  tvlUsd: number;
  isLastItem: boolean;
}

const DefiRow = ({
  id,
  chain,
  project,
  coin,
  apy,
  tvlUsd,
  isLastItem,
}: Props) => {
  const sizes = {
    width: '16px',
    height: '16px',
  };

  const protocol = PROTOCOLS[project];

  return (
    <div
      className={cn('border-gray-300 py-3 dark:border-gray-700', {
        'border-b-1 border-b border-gray-300 dark:border-gray-700': !isLastItem,
      })}
    >
      <div>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex  items-center gap-2'>
            <img
              loading='lazy'
              style={sizes}
              className='h-4 w-4 rounded-full'
              src={`${protocol?.logo}?tr=w-16,h-16,f_webp`}
              alt={`${protocol?.project} logo`}
            />
            <div>
              <p className='font-semibold capitalize dark:text-gray-200'>
                {protocol?.project}
              </p>
            </div>
          </div>
          <div>
            <p className='flex w-[150px] justify-end gap-1 align-middle'>
              <span className='tabular-nums dark:text-gray-200'>
                {formatPercentage(apy)}
              </span>
              <span className='mt-[5px] text-xs dark:text-gray-200'>APY</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefiRow;
