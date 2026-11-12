// Parámetros de financiación vigentes para Etapa 1: 50% entrega + saldo en UVA hasta 12 cuotas
export const FINANCING_DOWN_PAYMENT_RATIO = 0.5;
export const FINANCING_TNA = 0.15;
export const FINANCING_INSTALLMENT_OPTIONS = [3, 6, 9, 12] as const;

export function calcEntregaUSD(usdPrecio: number): number {
  return Math.round(usdPrecio * FINANCING_DOWN_PAYMENT_RATIO);
}

export function calcEntregaARS(usdPrecio: number, tipoCambio: number): number {
  return Math.round(usdPrecio * tipoCambio * FINANCING_DOWN_PAYMENT_RATIO);
}

export function calcCuotaInicialARS(
  usdPrecio: number,
  tipoCambio: number,
  cuotas: number,
  tna: number = FINANCING_TNA,
): number {
  const totalARS = usdPrecio * tipoCambio;
  const financiado = totalARS * (1 - FINANCING_DOWN_PAYMENT_RATIO);
  const r = tna / 12;
  const cuota = (financiado * r * Math.pow(1 + r, cuotas)) / (Math.pow(1 + r, cuotas) - 1);
  return Math.round(cuota);
}
