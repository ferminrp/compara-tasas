import { formatCurrency, formatPercentage } from 'src/utils/formats';

interface Option {
  value: string;
  label: string;
}

interface InvestmentConfig {
  meses: {
    label: string;
    options: Option[];
    info: string;
  };
  dias: {
    label: string;
    options: Option[];
    info: string;
  };
}

export const investmentConfig: InvestmentConfig = {
  meses: {
    label: 'Plazo de inversión (mínimo 1 mes)',
    options: [
      { value: '1', label: '1 Mes' },
      { value: '2', label: '2 Meses' },
      { value: '3', label: '3 Meses' },
      { value: '6', label: '6 Meses' },
      { value: '12', label: '12 Meses' },
    ],
    info: '* Los rendimientos se calculan en base a una reinversión mensual de un plazo fijo a 30 días. La tasa puede variar constantemente.',
  },
  dias: {
    label: 'Plazo de inversión (mínimo 30 días)',
    options: [
      { value: '30', label: '30 Días' },
      { value: '60', label: '60 Días' },
      { value: '90', label: '90 Días' },
    ],
    info: '* Los rendimientos se calculan en base a la variación del último día. La tasa puede variar constantemente.',
  },
};

interface InvestmentField {
  key: string;
  label: string;
  formatter?: (value: number) => string;
}

export const investmentFields: InvestmentField[] = [
  {
    key: 'monto',
    label: 'Monto a invertir',
    formatter: (value) => formatCurrency(value),
  },
  {
    key: 'plazo',
    label: 'Plazo',
  },
  {
    key: 'tna',
    label: 'TNA',
    formatter: (value) => formatPercentage(value),
  },
  {
    key: 'tea',
    label: 'TEA',
    formatter: (value) => formatPercentage(value),
  },
];
