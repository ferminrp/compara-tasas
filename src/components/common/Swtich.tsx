import React from 'react'
import type { Rate } from '../../model/business'

const Switch = ({ value, onChange, checked }: { value: Rate, onChange: () => void, checked:boolean }) => {


    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <span className="ms-3 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">TNA</span>
        <input type="checkbox" value={value} className="sr-only peer" checked={checked} onChange={onChange}/>
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[58px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">TEA</span>
      </label>
  
      )
  }

  export default Switch