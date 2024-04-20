import React, { useMemo, useState } from 'react';
import type { FormattedYield } from '../../../client/yields';
import type { BestCoin } from '../../../model/business';
import { filterByCoin } from '../../../utils/yields';
import SelectCoinDialog from './SelectCoinDialog';
import CoinInput from './TokenInput';
import Yields from './Yields';

interface Filters {
  coin: { coin: string; apy: number };
}

const Content = ({
  yields,
  options,
}: {
  yields: FormattedYield;
  options: BestCoin[];
}) => {
  //   const [filteredYields, setFilteredYields] = useState<FormattedYield>(yields);
  const [filters, setFilters] = useState<Filters>({ coin: options[0] });
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const filteredYields = useMemo(() => {
    return filterByCoin(yields, filters.coin.coin);
  }, [filters, yields]);

  const handleChangeCoin = (coin: BestCoin) => {
    setFilters((s) => ({ ...s, coin }));
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <CoinInput
        onClick={handleOpenDialog}
        selectedCoin={filters?.coin}
        options={options}
      />
      <Yields
        subtitle={'Compará en donde comprar crypto al mejor precio en'}
        yields={filteredYields}
      />
      <SelectCoinDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClickCoin={handleChangeCoin}
        options={options}
      />
    </>
  );
};

export default Content;
