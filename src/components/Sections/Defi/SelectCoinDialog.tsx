import React, { type Dispatch, type SetStateAction } from 'react';
import { Dialog, DialogContent } from '../../SimularInvestment/ui/dialog';

import ChartLineUp from '../../../assets/ChartLineUp';
import { cn } from '../../../lib/utils';
import type { BestCoin } from '../../../model/business';
import { formatPercentage } from '../../../utils/formats';
import { MAPPING_RETURNS } from '../../../utils/returnsMapping';
import { useMediaQuery } from '../../SimularInvestment/hooks/use-media-query';
import { Drawer, DrawerContent } from '../../SimularInvestment/ui/drawer';

const sizes = {
  width: '22px',
  height: '22px',
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClickCoin: (x: BestCoin) => void;
  options: BestCoin[];
}
const SelectCoinDialog = ({ open, setOpen, onClickCoin, options }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <ContentDialog options={options} onClick={onClickCoin} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <ContentDialog options={options} onClick={onClickCoin} />
      </DialogContent>
    </Dialog>
  );
};

const ContentDialog = ({
  options,
  onClick,
}: {
  options: BestCoin[];
  onClick: (x: BestCoin) => void;
}) => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div>
      <h4 className='py-3 text-2xl text-gray-800 dark:text-gray-300'>
        Elegí tu moneda
      </h4>
      <ul
        style={{ scrollbarWidth: 'none' }}
        className={cn(' h-[440px] overflow-y-scroll pb-4', {
          pocketShadowDark: isDarkMode,
          pocketShadowLight: !isDarkMode,
        })}
      >
        {[...options]
          .sort((a, b) => b.apy - a.apy)
          .map((item) => {
            return (
              <li
                key={item.coin}
                onClick={() => onClick(item)}
                className='border-b-1 my-6 flex h-[35px] cursor-pointer justify-between border-b border-gray-300 bg-white px-4 align-middle text-gray-800  shadow-sm hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:dark:bg-gray-800'
              >
                <div className='my-auto flex gap-2 '>
                  <img
                    style={sizes}
                    className='my-auto h-4 w-4 rounded-full'
                    src={`${
                      MAPPING_RETURNS[item.coin]?.logo
                    }&tr=w-22,h-22,f_webp`}
                    alt={`${item.coin} logo`}
                  />
                  <span className='font-semibold '>{item.coin}</span>
                </div>
                <div className='my-auto flex gap-2  text-green-600'>
                  <ChartLineUp className='my-auto' />
                  hasta {formatPercentage(item.apy)}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SelectCoinDialog;
