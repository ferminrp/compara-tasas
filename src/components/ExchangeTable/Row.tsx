import React from 'react'
import type { Investment, Rate } from '../../model/business';

interface Props {
    isLastItem: boolean;
    name: Investment['name'];
    tea: Investment['tea'];
    tna: Investment['tna'];
    logo: Investment['logo'];
    url: Investment['url'];
    selectedRate: Rate

}

const Row = ({isLastItem, name, tea, tna, logo, url, selectedRate}: Props) => {

const rateToFormat = selectedRate === 'TNA' ? tna : tea

const formattedRate = new Intl.NumberFormat('es-AR', { style: 'percent', minimumFractionDigits: 2 }).format(rateToFormat / 100);
const fullLogo = logo + '?tr=w-16,h-16,f_webp'

    return (
        <a className={`p-2 ${isLastItem ? 'dark:bg-gray-900' : 'border-b border-b-1 border-gray-100 dark:bg-gray-900'}`} href={`${url}?ref=comparatasas.ar`}>
            <div>
                <div className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <img loading="lazy" style={{width: '16px', height: '16px'}} className="rounded-full w-4 h-4" src={fullLogo} alt={`${name} logo`}/>
                    <div>
                    <p className="font-semibold capitalize dark:text-gray-200">{name}</p>
                    </div>
                </div>
                <p><span className="tabular-nums dark:text-gray-200">{formattedRate}</span> <span className="text-gray-400 text-xs">{selectedRate}</span></p>
                </div>
            </div>
        </a>
      )
};


  
export default Row;