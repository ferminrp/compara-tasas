import React from 'react'
import type { Rate } from '../../model/business';

interface Datum  {
  tea: number;
  logo:string;
  title?:string;
  name:string;
  url:string;
  detail:string
  tna: number
  selectedRate: Rate
}

const Card = ({tea,logo,title,name,url,detail,tna,selectedRate}: Datum) => {

const rateToFormat = selectedRate === 'TEA' ? tea : tna
  
const rate = new Intl.NumberFormat('es-AR', { style: 'percent', minimumFractionDigits: 2 }).format(rateToFormat / 100);
const logoImg = logo + '?tr=w-32,h-32,f_webp'

  return (
  <a className="bg-white shadow-sm rounded-lg border-gray-300 p-4 text-gray dark:bg-gray-900" href={`${url}?ref=comparatasas.ar`}>
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <img loading="lazy" style={{ width: '32px', height: '32px' }} className="rounded-full w-8 h-8" width="32" height="32" src={logoImg} alt={`${title} logo`} />
            <div>
              <p className="font-semibold capitalize flex items-center content-center dark:text-gray-200">{name}</p>
              <p className="text-gray-400 text-xs">{detail}</p>
            </div>
        </div>
        <p><span className="tabular-nums dark:text-gray-200">{rate}</span>  <span className="text-gray-400 text-xs">{selectedRate}</span></p>
      </div>
    </div>
  </a>
  
  )
}

export default Card