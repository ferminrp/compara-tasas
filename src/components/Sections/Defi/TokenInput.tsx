import React from 'react';
import ChartLineUp from '../../../assets/ChartLineUp';
import DropDown from '../../../assets/DropwDown';
import type { BestCoin } from '../../../model/business';
import { formatPercentage } from '../../../utils/formats';
import { MAPPING_RETURNS } from '../../../utils/returnsMapping';

interface Props {
  selectedCoin: { coin: string; apy: number };
  onClick: () => void;
  options: BestCoin[];
}

const sizes = {
  width: '22px',
  height: '22px',
};

const CoinInput = ({ onClick, selectedCoin }: Props) => {
  return (
    <div
      onClick={onClick}
      className='border-1 flex h-[35px] cursor-pointer justify-between rounded-lg border border-gray-300 bg-white px-4 align-middle text-gray-800 shadow-sm  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:dark:bg-gray-800'
    >
      <div className='my-auto flex gap-2 '>
        <img
          style={sizes}
          className='h-4 w-4 rounded-full'
          src={`${
            MAPPING_RETURNS[selectedCoin.coin]?.logo
          }&tr=w-22,h-22,f_webp`}
          alt={`${selectedCoin.coin} logo`}
        />
        <span className='font-semibold'>{selectedCoin.coin}</span>
      </div>
      <div className='my-auto flex gap-2  text-green-600'>
        <ChartLineUp className='my-auto' />
        {formatPercentage(selectedCoin.apy)}
        <DropDown className='my-auto' />
      </div>
    </div>
  );
};

export default CoinInput;
