import React, { useState } from 'react'
import type { Investment, InvestmentType, Rate } from '../../model/business'
import Card from '../Card/Card';
import Switch from '../common/Swtich';

interface Props {
    investmentFilter: InvestmentType;
    data: Investment[];
    title: string
}

const InvestmentSection = ({ investmentFilter, data, title }: Props) => {

  const [selectedRate, setSelectedRate] = useState<Rate>("TEA")

 const onChange = () => {
  setSelectedRate(selectedRate == 'TEA' ? 'TNA' : 'TEA')
 }

  return (
    <div className="flex flex-col gap-4 my-6">
      <div className='flex justify-between'>
        <h2 className="text-xl text-gray-800 dark:text-gray-300 font-bold">
          {title}   
        </h2>
      <Switch value={selectedRate} onChange={onChange} checked={selectedRate === 'TEA'}/>
      </div>

        {
          data
           ?.filter((item) => item.type === investmentFilter)
          .map((item) => <Card {...item} selectedRate={selectedRate} />)
         }
     </div>
  )
}

export default InvestmentSection

