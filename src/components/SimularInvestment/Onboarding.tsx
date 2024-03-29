import * as React from 'react';
import { useState } from 'react';
import { cn } from './lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from './ui/dialog';

interface SimulacionOnboardingProps {
  className?: string;
  data: any;
}

export default function SimulacionOnboarding({
  className,
  data,
}: SimulacionOnboardingProps) {
  const [plazo, setPlazo] = useState<number | undefined>(undefined);
  const [monto, setMonto] = useState<number | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(1);

  const handleMontoChange = (value: number) => {
    setMonto(isNaN(value) ? undefined : value);
  };
  const handlePlazoChange = (value: number) => {
    setPlazo(isNaN(value) ? undefined : value);
  };
  // Desabilitar boton si el monto y/o inversion es menor al minimo
  const isButtonDisabled =
    monto === undefined || plazo === undefined || monto < 1500 || plazo < 30;

  const handleNextClick = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
    setMonto(0);
    setPlazo(0);
  };

  const rendimiento =
    monto && plazo ? monto * (plazo / 360) * (data.tna / 100) : 0;

  function formatearNumero(numero) {
    const partes = numero.toFixed(2).toString().split('.');
    const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const parteDecimal = partes[1];
    return parteEntera + ',' + parteDecimal;
  }

  const rendimientoFormateado = formatearNumero(rendimiento);
  const montoFormateado = monto ? formatearNumero(monto) : '';
  const recibisFormateado = formatearNumero(monto + rendimiento);

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div>
      {/* Mostrar esto en la primer pantalla */}
      {currentStep === 1 && (
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <div
                className={`h-2 w-2 rounded-full bg-black dark:bg-white`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600`}
              ></div>
            </div>
            <DialogClose asChild>
              <Button variant='ghost' className='pr-0 hover:!bg-transparent'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  className='bi bi-x-lg iconClose'
                  viewBox='0 0 16 16'
                  fill={isDarkMode ? 'white' : 'black'}
                >
                  <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                </svg>
              </Button>
            </DialogClose>
          </div>
          <DialogHeader>
            <DialogTitle className='text-gray-800 dark:text-gray-200'>
              Simulá tu inversión
            </DialogTitle>
            <DialogDescription>
              Definí monto a invertir y duración, para calcular los
              rendimientos.
            </DialogDescription>
          </DialogHeader>

          <form
            className={cn('mb-14 grid items-start gap-4 md:mb-4', className)}
          >
            <div className='grid gap-2'>
              <Input
                type='number'
                inputmode='numeric'
                id='dinero'
                placeholder='$ 1.500'
                pattern='[0-9]*'
                className='text-md py-6 text-gray-800 dark:text-gray-200'
                onChange={(e) => handleMontoChange(parseInt(e.target.value))}
              />
              <Label htmlFor='dinero' className='text-[#858994]'>
                Monto a invertir (mínimo $1.500)
              </Label>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex'>
                <Input
                  type='number'
                  inputmode='numeric'
                  id='plazo'
                  placeholder='30'
                  value={plazo === undefined ? '' : plazo.toString()}
                  onChange={(e) => handlePlazoChange(parseInt(e.target.value))}
                  className='text-md rounded-r-none border-r-0 py-6 text-[16px] text-gray-800 dark:text-gray-200'
                />
                <Select
                  onValueChange={(value) => handlePlazoChange(parseInt(value))}
                >
                  <SelectTrigger className='w-[180px] rounded-l-none border-l-0 py-6 text-gray-800 dark:text-gray-200'>
                    <SelectValue placeholder='Días' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        value='30'
                        onSelect={() => handlePlazoChange(30)}
                      >
                        30 Días
                      </SelectItem>
                      <SelectItem
                        value='60'
                        onSelect={() => handlePlazoChange(60)}
                      >
                        60 Días
                      </SelectItem>
                      <SelectItem
                        value='90'
                        onSelect={() => handlePlazoChange(90)}
                      >
                        90 Días
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Label htmlFor='plazo' className='text-[#858994]'>
                Plazo de inversión (mínimo 30 días)
              </Label>
            </div>

            <Button
              type='button'
              onClick={handleNextClick}
              className='my-10 !bg-[#6469F2] !text-white'
              disabled={isButtonDisabled}
            >
              Siguiente
            </Button>
          </form>
        </div>
      )}
      {/* En la pantalla dos mostrar esto */}
      {currentStep === 2 && (
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <div
                className={`h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full bg-black dark:bg-white`}
              ></div>
            </div>
            <DialogClose asChild>
              <Button variant='ghost' className='pr-0 hover:!bg-transparent'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  className='bi bi-x-lg iconClose'
                  viewBox='0 0 16 16'
                  fill={isDarkMode ? 'white' : 'black'}
                >
                  <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                </svg>
              </Button>
            </DialogClose>
          </div>
          <DialogHeader className='!my-0 !flex-col items-center gap-0'>
            <img
              className='h-12 w-12 rounded-full'
              src={data?.logo}
              alt={data.name}
            />
            <div className='flex flex-col text-white'>
              <h1 className='text-xl font-bold text-neutral-900 dark:text-white'>
                {data?.detail}
              </h1>
              <p className='text-md !text-center text-[#9da2ac]'>{data.name}</p>
            </div>
          </DialogHeader>

          <div className='text-md text-gray-400'>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>Monto a invertir</p> <span>${montoFormateado}</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>Plazo</p> <span>{plazo} días</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>TNA</p>
              <span>{(data?.tna || 0).toFixed(2).replace('.', ',')} %</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>TEA</p>
              <span>{(data?.tea || 0).toFixed(2).replace('.', ',')} %</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>Recibís</p>
              <span>${recibisFormateado}</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 font-semibold text-gray-700 dark:border-[#223455] dark:text-gray-200'>
              <p>Interés ganado *</p>
              <span>${rendimientoFormateado}</span>
            </div>
          </div>

          <p className='my-6 text-xs text-gray-400 dark:text-gray-500'>
            * Los rendimientos se calculan en base a la variación del último
            día. La tasa puede variar constantemente.
          </p>

          <div className='mb-8 flex flex-col gap-2'>
            <Button type='button' className='w-full !bg-[#6469F2] !text-white'>
              <a href={data?.url}> Visitá el sitio web de {data.name}</a>
            </Button>
            <Button
              type='button'
              onClick={handlePrevClick}
              variant='ghost'
              className='w-full text-sm text-[#6469F2] underline'
            >
              Nueva simulación
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
