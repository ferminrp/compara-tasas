import { useState } from 'react';
import { formatCurrency } from 'src/utils/formats';
import { investmentConfig, investmentFields } from './Onboarding.constants';
import { cn } from './lib/utils';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import NumberFormat from './ui/number-format';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface DataProps {
  tna: number;
  tea: number;
  name: string;
  logo: string;
  detail: string;
  url: string;
}

interface SimulacionOnboardingProps {
  className?: string;
  data: DataProps;
  multiplo30: boolean;
}

const Dot = ({ isStepActive }: { isStepActive: boolean }) => {
  return (
    <div
      className={cn('h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600', {
        'bg-black dark:bg-white': isStepActive,
      })}
    />
  );
};

const plazoInitialValue = null;
const montoInitialValue = null;

export default function SimulacionOnboarding({
  className,
  data,
  multiplo30,
}: SimulacionOnboardingProps) {
  const [plazo, setPlazo] = useState<number | null>(plazoInitialValue);
  const [monto, setMonto] = useState<number | null>(montoInitialValue);
  const [currentStep, setCurrentStep] = useState(1);

  const handlePlazoChange = (value: string) => {
    value === ''
      ? setPlazo(plazoInitialValue)
      : setPlazo(Number.parseInt(value));
  };

  const handleMontoChange = (value: number) => {
    Number.isFinite(value) ? setMonto(value) : setMonto(montoInitialValue);
  };

  const { tna, tea, name, logo, detail, url } = data || {};

  // Desabilitar boton si el monto y/o inversion es menor al minimo
  const isButtonDisabled =
    monto === montoInitialValue ||
    plazo === plazoInitialValue ||
    monto < 1500 ||
    (multiplo30 ? plazo < 1 : plazo < 30);

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = () => {
    setCurrentStep(currentStep - 1);
    setPlazo(plazoInitialValue);
    setMonto(montoInitialValue);
  };

  const diasEnPlazo = multiplo30 ? 12 : 365;

  const teaDecimal = tea / 100;
  const r = (1 + teaDecimal) ** (1 / diasEnPlazo) - 1;
  const total = monto * (1 + r) ** plazo;
  const rendimiento = total - monto;

  const investmentValues = {
    monto,
    plazo: `${plazo} ${multiplo30 ? (plazo === 1 ? 'mes' : 'meses') : 'días'}`,
    tna,
    tea,
  };

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const investmentTime = multiplo30 ? 'meses' : 'dias';

  const isStepActive = (step: number) => currentStep === step;

  return (
    <div>
      <div className='mb-4 mt-2 flex items-center justify-between md:mt-0'>
        <div className='flex items-center gap-1'>
          <Dot isStepActive={isStepActive(1)} />
          <Dot isStepActive={isStepActive(2)} />
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
              <title>Cerrar</title>
              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
            </svg>
          </Button>
        </DialogClose>
      </div>

      {/* Mostrar esto en la primer pantalla */}
      {currentStep === 1 && (
        <>
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
              <NumberFormat
                value={monto ?? ''}
                onValueChange={(values) => {
                  handleMontoChange(values.floatValue);
                }}
                className='text-md py-6 text-gray-800 dark:text-gray-200'
                customInput={Input}
                placeholder='$1.500'
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
                  value={plazo ?? ''}
                  onChange={(e) => handlePlazoChange(e.target.value)}
                  className='text-md py-6 text-[16px] text-gray-800 dark:text-gray-200'
                />
                <Select onValueChange={handlePlazoChange}>
                  <SelectTrigger
                    className='w-[140px] rounded-l-none border-l-0 py-6 text-gray-800 dark:text-gray-200'
                    multiplo30={multiplo30}
                    selectedValue={plazo}
                  >
                    <SelectValue placeholder={multiplo30 ? 'Meses' : 'Días'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {investmentConfig[investmentTime].options.map(
                        ({ value, label }) => (
                          <SelectItem
                            key={value}
                            value={value}
                            onSelect={() => handlePlazoChange(value)}
                          >
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Label htmlFor='plazo' className='text-[#858994]'>
                {investmentConfig[investmentTime].label}
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
        </>
      )}

      {/* En la pantalla dos mostrar esto */}
      {currentStep === 2 && (
        <>
          <DialogHeader className='my-0 !flex-col items-center gap-0'>
            <img className='h-12 w-12 rounded-full' src={logo} alt={name} />
            <div className='flex flex-col text-white'>
              <h1 className='text-xl font-bold text-neutral-900 dark:text-white'>
                {detail}
              </h1>
              <p className='text-md !text-center text-[#9da2ac]'>{name}</p>
            </div>
          </DialogHeader>

          <div className='text-md mt-2 text-gray-400'>
            {investmentFields.map(({ key, label, formatter }) => {
              const value = investmentValues[key];
              const formattedValue = formatter ? formatter(value) : value;
              return (
                <div
                  key={key}
                  className='flex items-center justify-between border-b border-gray-200 py-2 dark:border-[#223455]'
                >
                  <p>{label}</p> <span>{formattedValue}</span>
                </div>
              );
            })}
            <div className='flex items-center justify-between border-b border-gray-200 py-2  text-gray-700 dark:border-[#223455] dark:text-gray-200'>
              <p className='font-semibold'>Recibís *</p>
              <span className='flex items-center gap-2'>
                <span className='text-gray-400'>
                  (+{formatCurrency(rendimiento)})
                </span>
                <span className='font-semibold'>{formatCurrency(total)}</span>
              </span>
            </div>
          </div>

          <p className='my-4 text-[12px] text-gray-400 dark:text-gray-500'>
            {investmentConfig[investmentTime].info}
          </p>

          <div className='mb-4 flex flex-col gap-2 md:mb-4'>
            <a href={url} target='_blank' rel='noreferrer'>
              <Button
                type='button'
                className='w-full !bg-[#6469F2] !text-white'
              >
                Visitá el sitio web de {name}
              </Button>
            </a>
            <Button
              type='button'
              onClick={handlePrevClick}
              variant='ghost'
              className='w-full text-sm text-[#6469F2] underline'
            >
              Nueva simulación
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
