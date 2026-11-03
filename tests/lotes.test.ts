import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOTES } from '../src/app/components/lotes/lotes.data.ts';

const ROOT_DIR = join(import.meta.dirname, '..');

describe('Loteo Ruta 4 - Validación de Precios y Ocultación de Etapa 2', () => {
  test('Los lotes disponibles de la Etapa 1 deben tener sus precios actualizados (5.500 USD y Lote 14 a 6.500 USD)', () => {
    const etapa1 = LOTES.filter(l => l.etapa === 1);
    assert.equal(etapa1.length, 14, 'Etapa 1 debe tener exactamente 14 lotes');

    const disponibles = etapa1.filter(l => l.estado === 'disponible');
    assert.equal(disponibles.length, 4, 'Deben existir exactamente 4 lotes disponibles en la Etapa 1');

    const numerosDisponibles = disponibles.map(l => l.num).sort((a, b) => a - b);
    assert.deepEqual(numerosDisponibles, [10, 12, 13, 14], 'Los lotes disponibles deben ser 10, 12, 13 y 14');

    const preciosEsperados: Record<number, number> = { 10: 5500, 12: 5500, 13: 5500, 14: 6500 };
    for (const lote of disponibles) {
      assert.equal(lote.usd, preciosEsperados[lote.num], `El lote ${lote.num} debe costar ${preciosEsperados[lote.num]} USD`);
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

  test('hero.component.ts no debe contener menciones a Etapa 2 y debe promocionar los lotes desde USD 5.500', () => {
    const heroTs = readFileSync(join(ROOT_DIR, 'src/app/components/hero/hero.component.ts'), 'utf-8');
    assert.doesNotMatch(heroTs, /Etapa\s*2/i, 'hero.component.ts no debe mencionar "Etapa 2"');
    assert.doesNotMatch(heroTs, /Manzana\s*E/i, 'hero.component.ts no debe mencionar "Manzana E"');
    assert.match(heroTs, /desde USD 5\.500/, 'hero.component.ts debe reflejar el precio desde USD 5.500');
  });

  test('lotes.component.ts debe renderizar por defecto la Etapa 1 sin selector de etapas ni badges de Etapa 2', () => {
    const lotesTs = readFileSync(join(ROOT_DIR, 'src/app/components/lotes/lotes.component.ts'), 'utf-8');
    assert.doesNotMatch(lotesTs, /class="tabs-container"/, 'No debe existir el selector de etapas en el HTML activo');
    assert.doesNotMatch(lotesTs, /badge-etapa1/, 'No debe mostrar insignias residuales de etapa');
    assert.match(lotesTs, /etapaSeleccionada:\s*number\s*=\s*1;/, 'etapaSeleccionada debe inicializarse en 1');
  });
});
