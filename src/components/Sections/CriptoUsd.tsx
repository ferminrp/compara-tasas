import React, {useState} from 'react'
import type { Exchange } from '../../model/exchange'
import ExchangeTable from '../ExchangeTable/ExchangeTable'
import type { Rate } from '../../model/business'
import Switch from '../common/Swtich'

interface Props {
    title: string
    subtitle: string
    exchanges: Exchange[]
}

const CriptoUsd = ({title, subtitle, exchanges}:Props) => {

    const [selectedRate, setSelectedRate] = useState<Rate>('TEA')

    const onChange = () => {
        setSelectedRate(selectedRate === 'TNA' ? "TEA" : 'TNA')
    }


  return (
    <div className="flex flex-col gap-4 my-6">
        <div className='flex justify-between'>
            <h2 className="text-xl text-gray-800 dark:text-gray-300 font-bold">
                {title}
            </h2>
            <Switch value={selectedRate} onChange={onChange} checked={selectedRate === 'TEA'} />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs">
            {subtitle} <a
              className="underline"
              href="https://usdc.ar">USDC.AR</a>.
        </p>
    
    {exchanges.map((exchange) => {
        return <ExchangeTable exchange={exchange} key={exchange.name} selectedRate={selectedRate} />
    })}

    </div>
  )
}

export default CriptoUsd