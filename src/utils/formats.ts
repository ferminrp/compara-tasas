export const formatPercentage = (percentage: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(percentage / 100);

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
