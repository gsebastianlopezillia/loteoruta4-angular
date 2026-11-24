export type EstadoLote = 'disponible' | 'vendido' | 'nodisponible' | 'reservado';

export interface Lote {
  num: number;
  dim: string;
  estado: EstadoLote;
  usd?: number;
  m2: number;
  etapa: number;
  manzana?: string;
  shape?: string;
}

export const LOTES: Lote[] = [
  // --- ETAPA 1 (Legacy / Manzana B) ---
  { num: 1, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 2, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 3, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 4, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 5, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 6, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 7, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 8, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 9, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 10, dim: '12.50×78.84', m2: 985.33, estado: 'disponible', usd: 5500, etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 11, dim: '12.50×79.09', m2: 988.46, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 12, dim: '12.50×79.34', m2: 991.59, estado: 'disponible', usd: 5500, etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 13, dim: '12.50×79.58', m2: 994.65, estado: 'disponible', usd: 5500, etapa: 1, shape: '4,13 56,13 56,23 4,23' },
  { num: 14, dim: '12.50×79.83', m2: 997.71, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },

  // --- ETAPA 2 (Manzana E) - Preservada para reactivación futura ---
  { num: 1, dim: '16×57 irregular', m2: 968.35, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,4 40,7 40,32 20,32' },
  { num: 2, dim: '17×53 irregular', m2: 792.74, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,6 40,14 40,32 20,32' },
  { num: 3, dim: '17×39 irregular', m2: 544.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,13 40,22 40,32 20,32' },
  { num: 4, dim: '17×48 irregular', m2: 945.25, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,3 40,10 40,32 20,32' },
  { num: 5, dim: '17×48 irregular', m2: 694.30, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,8 40,18 40,32 20,32' },
  { num: 6, dim: '38×33 irregular', m2: 644.57, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '12,12 48,21 48,32 12,32' },
  { num: 7, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 8, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 9, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 10, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 11, dim: '19.16×50', m2: 958.00, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 12, dim: '19.16×50', m2: 958.00, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 13, dim: '19.16×50', m2: 958.00, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 14, dim: '19.16×50', m2: 958.00, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 15, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 16, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 17, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 18, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 19, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
  { num: 20, dim: '19.17×50', m2: 958.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '6,9 54,9 54,27 6,27' },
];
