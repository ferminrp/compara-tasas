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
  multiplo30: boolean;
}

export default function SimulacionOnboarding({
  className,
  data,
  multiplo30,
}: SimulacionOnboardingProps) {
  const [plazo, setPlazo] = useState<number | undefined>(undefined);
  const [monto, setMonto] = useState<number | undefined>(undefined);
  const [rawMonto, setRawMonto] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formattedMonto, setFormattedMonto] = useState<string>('');

  const formatNumberToPrice = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleMontoChange = (value: string) => {
    setRawMonto(value); // Update the raw input value as user types
    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    if (!isNaN(numericValue)) {
      setMonto(numericValue);
    } else {
      setMonto(undefined);
    }
  };
  const handleMontoBlur = () => {
    if (monto !== undefined) {
      const formattedValue = formatNumberToPrice(monto);
      setFormattedMonto(formattedValue);
      setRawMonto(formattedValue); // Update the raw input to the formatted value on blur
    } else {
      setFormattedMonto('');
      setRawMonto('');
    }
  };
  const handlePlazoChange = (value: number) => {
    setPlazo(isNaN(value) ? undefined : value);
  };
  // Desabilitar boton si el monto y/o inversion es menor al minimo
  const isButtonDisabled =
    monto === undefined ||
    plazo === undefined ||
    monto < 1500 ||
    (multiplo30 ? plazo < 1 : plazo < 30);

  const handleNextClick = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep(currentStep - 1);
    setMonto(0);
    setPlazo(0);
  };

  function formatearNumero(numero) {
    const partes = numero.toFixed(2).toString().split('.');
    const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const parteDecimal = partes[1];
    return parteEntera + ',' + parteDecimal;
  }

  const teaDecimal = data.tea / 100;
  const r = Math.pow(1 + teaDecimal, 1 / 365) - 1;
  const VF = monto * Math.pow(1 + r, plazo);

  const rMensual = Math.pow(1 + teaDecimal, 1 / 12) - 1;
  const VFMensual = monto * Math.pow(1 + rMensual, plazo);

  const montoFormateado = monto ? formatearNumero(monto) : '';
  const recibisFormateado = formatearNumero(VF);
  const rendimientoFormateado = formatearNumero(VF - monto);
  const recibisFormateadoMensual = formatearNumero(VFMensual);
  const rendimientoFormateadoMensual = formatearNumero(VFMensual - monto);

  console.log(plazo);
  console.log(monto);
  console.log(montoFormateado);
  console.log(r);
  console.log(rMensual);

  console.log(VF);
  console.log(VFMensual);

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div>
      {/* Mostrar esto en la primer pantalla */}
      {currentStep === 1 && (
        <div>
          <div className='mb-4 mt-2 flex items-center justify-between md:mt-0'>
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
                  width='16'
                  height='16'
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
            <DialogTitle className='mt-4 text-gray-800 md:mt-0 dark:text-gray-200'>
              Simulá tu inversión
            </DialogTitle>
            <DialogDescription>
              Definí monto a invertir y duración, para calcular los
              rendimientos.
            </DialogDescription>
          </DialogHeader>

          <form
            className={cn('mb-4 grid items-start gap-4 md:mb-0', className)}
          >
            <div className='grid gap-2'>
              <Input
                type='text'
                inputmode='numeric'
                id='dinero'
                placeholder='$ 1.500,00'
                pattern='[0-9]*'
                className='text-md py-6 text-gray-800 dark:text-gray-200'
                value={currentStep === 1 ? rawMonto : formattedMonto}
                onChange={(e) => handleMontoChange(e.target.value)}
                onBlur={handleMontoBlur}
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
                  placeholder={multiplo30 ? '3' : '30'}
                  value={plazo === undefined ? '' : plazo.toString()}
                  onChange={(e) => handlePlazoChange(parseInt(e.target.value))}
                  className='text-md py-6 text-[16px] text-gray-800 dark:text-gray-200'
                />
                <Select
                  onValueChange={(value) => handlePlazoChange(parseInt(value))}
                >
                  <SelectTrigger
                    className='w-[140px] rounded-l-none border-l-0 py-6 text-gray-800 dark:text-gray-200'
                    multiplo30={multiplo30}
                    selectedValue={plazo}
                  >
                    <SelectValue placeholder={multiplo30 ? 'Meses' : 'Días'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        value={multiplo30 ? '1' : '30'}
                        onSelect={() =>
                          multiplo30
                            ? handlePlazoChange(1)
                            : handlePlazoChange(30)
                        }
                      >
                        {multiplo30 ? '1 Mes' : '30 Días'}
                      </SelectItem>
                      <SelectItem
                        value={multiplo30 ? '2' : '60'}
                        onSelect={() =>
                          multiplo30
                            ? handlePlazoChange(2)
                            : handlePlazoChange(60)
                        }
                      >
                        {multiplo30 ? '2 Meses' : '60 Días'}
                      </SelectItem>
                      <SelectItem
                        value={multiplo30 ? '3' : '90'}
                        onSelect={() =>
                          multiplo30
                            ? handlePlazoChange(3)
                            : handlePlazoChange(90)
                        }
                      >
                        {multiplo30 ? '3 Meses' : '90 Días'}
                      </SelectItem>
                      {multiplo30 && (
                        <>
                          <SelectItem
                            value='6'
                            onSelect={() => handlePlazoChange(6)}
                          >
                            {'6 Meses'}
                          </SelectItem>
                          <SelectItem
                            value='12'
                            onSelect={() => handlePlazoChange(12)}
                          >
                            {'12 Meses'}
                          </SelectItem>
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Label htmlFor='plazo' className='text-[#858994]'>
                {multiplo30
                  ? 'Plazo de inversión (mínimo 1 mes)'
                  : 'Plazo de inversión (mínimo 30 días)'}
              </Label>
            </div>

            <Button
              type='button'
              onClick={handleNextClick}
              className='my-6 !bg-[#6469F2] !text-white'
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
          <div className='mt-2 flex items-center justify-between'>
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
                  width='16'
                  height='16'
                  className='bi bi-x-lg iconClose'
                  viewBox='0 0 16 16'
                  fill={isDarkMode ? 'white' : 'black'}
                >
                  <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                </svg>
              </Button>
            </DialogClose>
          </div>
          <DialogHeader className='my-0 !flex-col items-center gap-0'>
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

          <div className='text-md mt-2 text-gray-400'>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>Monto a invertir</p> <span>${montoFormateado}</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>Plazo</p>{' '}
              <span>
                {plazo} {multiplo30 ? (plazo === 1 ? 'mes' : 'meses') : 'días'}
              </span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>TNA</p>
              <span>{(data?.tna || 0).toFixed(2).replace('.', ',')} %</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'>
              <p>TEA</p>
              <span>{(data?.tea || 0).toFixed(2).replace('.', ',')} %</span>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 py-2  text-gray-700 dark:border-[#223455] dark:text-gray-200'>
              <p className='font-semibold'>Recibís *</p>
              {multiplo30 ? (
                <span className='flex items-center gap-2'>
                  <span className='text-gray-400'>
                    (+${rendimientoFormateadoMensual})
                  </span>
                  <span className='font-semibold'>
                    ${recibisFormateadoMensual}
                  </span>
                </span>
              ) : (
                <span className='flex items-center gap-2'>
                  <span className='text-gray-400'>
                    (+${rendimientoFormateado})
                  </span>
                  <span className='font-semibold'>${recibisFormateado} </span>
                </span>
              )}
            </div>
          </div>

          <p className='my-4 text-[12px] text-gray-400 dark:text-gray-500'>
            * Los rendimientos se calculan en base a la variación del último
            día. La tasa puede variar constantemente.
          </p>

          <div className='mb-4 flex flex-col gap-2 md:mb-4'>
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
