import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOTES } from '../src/app/components/lotes/lotes.data.ts';
import {
  FINANCING_DOWN_PAYMENT_RATIO,
  FINANCING_INSTALLMENT_OPTIONS,
  FINANCING_TNA,
  calcCuotaInicialARS,
  calcEntregaARS,
  calcEntregaUSD,
} from '../src/app/components/lotes/lotes.financing.ts';

const ROOT_DIR = join(import.meta.dirname, '..');

describe('Loteo Ruta 4 - Validación de Precios y Ocultación de Etapa 2', () => {
  test('Los lotes disponibles de la Etapa 1 deben ser solo los 3 de 5.500 USD y el Lote 14 debe figurar vendido', () => {
    const etapa1 = LOTES.filter(l => l.etapa === 1);
    assert.equal(etapa1.length, 14, 'Etapa 1 debe tener exactamente 14 lotes');

    const disponibles = etapa1.filter(l => l.estado === 'disponible');
    assert.equal(disponibles.length, 3, 'Deben existir exactamente 3 lotes disponibles en la Etapa 1');

    const numerosDisponibles = disponibles.map(l => l.num).sort((a, b) => a - b);
    assert.deepEqual(numerosDisponibles, [10, 12, 13], 'Los lotes disponibles deben ser 10, 12 y 13');

    const lote14 = etapa1.find(l => l.num === 14);
    assert.equal(lote14?.estado, 'vendido', 'El lote 14 debe figurar como vendido');

    for (const lote of disponibles) {
      assert.equal(lote.usd, 5500, `El lote ${lote.num} debe costar 5500 USD`);
    }
  });

  test('Los datos de Etapa 2 deben permanecer preservados en lotes.data.ts', () => {
    const etapa2 = LOTES.filter(l => l.etapa === 2);
    assert.equal(etapa2.length, 20, 'La Etapa 2 debe preservar sus 20 lotes para futura reactivación');
  });

  test('index.html no debe contener menciones a Etapa 2 ni a preventas de la misma', () => {
    const indexHtml = readFileSync(join(ROOT_DIR, 'src/index.html'), 'utf-8');
    assert.doesNotMatch(indexHtml, /Etapa\s*2/i, 'index.html no debe mencionar "Etapa 2"');
    assert.doesNotMatch(indexHtml, /Manzana\s*E/i, 'index.html no debe mencionar "Manzana E"');
    assert.match(indexHtml, /desde USD 5\.500/, 'index.html debe reflejar el precio desde USD 5.500');
  });

  test('hero.component.ts no debe contener menciones a Etapa 2 y debe promocionar los últimos 3 lotes a USD 5.500', () => {
    const heroTs = readFileSync(join(ROOT_DIR, 'src/app/components/hero/hero.component.ts'), 'utf-8');
    assert.doesNotMatch(heroTs, /Etapa\s*2/i, 'hero.component.ts no debe mencionar "Etapa 2"');
    assert.doesNotMatch(heroTs, /Manzana\s*E/i, 'hero.component.ts no debe mencionar "Manzana E"');
    assert.doesNotMatch(heroTs, /Últimos\s*4\s*lotes/i, 'hero.component.ts no debe mencionar 4 lotes');
    assert.match(heroTs, /Últimos 3 lotes a USD 5\.500/, 'hero.component.ts debe reflejar los últimos 3 lotes a USD 5.500');
  });

  test('lotes.component.ts debe renderizar por defecto la Etapa 1 sin selector de etapas ni badges de Etapa 2', () => {
    const lotesTs = readFileSync(join(ROOT_DIR, 'src/app/components/lotes/lotes.component.ts'), 'utf-8');
    assert.doesNotMatch(lotesTs, /class="tabs-container"/, 'No debe existir el selector de etapas en el HTML activo');
    assert.doesNotMatch(lotesTs, /badge-etapa1/, 'No debe mostrar insignias residuales de etapa');
    assert.match(lotesTs, /etapaSeleccionada:\s*number\s*=\s*1;/, 'etapaSeleccionada debe inicializarse en 1');
  });

  test('La financiación vigente exige 50% de entrega y saldo en UVA (15% TNA) hasta 12 cuotas sin menciones a 24 cuotas', () => {
    assert.equal(FINANCING_DOWN_PAYMENT_RATIO, 0.5);
    assert.equal(FINANCING_TNA, 0.15);
    assert.deepEqual([...FINANCING_INSTALLMENT_OPTIONS], [3, 6, 9, 12]);

    assert.equal(calcEntregaUSD(5500), 2750);
    assert.equal(calcEntregaARS(5500, 1000), 2750000);

    // Saldo financiado: 2.750 USD * 1000 ARS = 2.750.000 ARS en 12 cuotas al 15% TNA (~248.210 ARS/mes)
    const cuota12 = calcCuotaInicialARS(5500, 1000, 12);
    assert.equal(cuota12, 248210);

    const lotesTs = readFileSync(join(ROOT_DIR, 'src/app/components/lotes/lotes.component.ts'), 'utf-8');
    const faqTs = readFileSync(join(ROOT_DIR, 'src/app/components/faq/faq.component.ts'), 'utf-8');
    assert.doesNotMatch(lotesTs, /100%\s*financiado|24\s*cuotas/i);
    assert.doesNotMatch(faqTs, /24\s*cuotas/i);
    assert.match(lotesTs, /50%/);
    assert.match(lotesTs, /hasta 12 cuotas/);
    assert.match(faqTs, /50%.*12 cuotas.*UVA/s);
  });

  test('Deben existir y publicarse privacidad.html y condiciones.html para cumplimiento de Meta App', () => {
    const angularJson = readFileSync(join(ROOT_DIR, 'angular.json'), 'utf-8');
    const privacidad = readFileSync(join(ROOT_DIR, 'src/privacidad.html'), 'utf-8');
    const condiciones = readFileSync(join(ROOT_DIR, 'src/condiciones.html'), 'utf-8');

    assert.match(angularJson, /src\/privacidad\.html/);
    assert.match(angularJson, /src\/condiciones\.html/);
    assert.match(privacidad, /Política de Privacidad/);
    assert.match(privacidad, /5493764165357/);
    assert.match(condiciones, /Condiciones del Servicio/);
    assert.match(condiciones, /loteoruta4\.com/);
  });
});
