import React from 'react'
import type { Exchange } from '../../model/exchange'
import Row from './Row'
import type { Rate } from '../../model/business'

interface Props {
    exchange: Exchange
    selectedRate: Rate
}

const ExchangeTable = ({exchange, selectedRate}:Props) => {
  return (
    <div
    className="flex flex-col bg-white shadow-sm rounded-lg border-gray-300 px-4 py-2 dark:bg-gray-900"
  >
    <a
      className="border-b border-b-1 border-gray-100 py-4"
      href={exchange.link}
    >
      <div className="">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              loading="lazy"
              style={{width: '32px', height: '32px'}}
              className="rounded-full w-8 y-8"
              width="32"
              height="32"
              src={exchange.logo}
              alt={exchange.altLogo}
            />
            <div>
              <p className="font-semibold capitalize dark:text-gray-200">
                {exchange.name}
              </p>
            </div>
          </div>
          <button
            className="bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-500 py-1 px-4 border border-indigo-600 rounded-lg"
          >
            Descargar
          </button>
        </div>
      </div>
    </a>
    {
      exchange.data.map((item, index) => (
        <Row {...item} isLastItem={index === exchange.data.length - 1} selectedRate={selectedRate} key={item.id} />
      ))
    }
  </div>
  )
}

export default ExchangeTable