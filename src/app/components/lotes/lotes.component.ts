import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '../../services/analytics.service';

type EstadoLote = 'disponible' | 'vendido' | 'nodisponible' | 'reservado';
interface Lote {
  num: number;
  dim: string;
  estado: EstadoLote;
  usd?: number;
  m2: number;
  etapa: number;
  manzana?: string;
  shape?: string;
}

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="lotes" class="section lotes-section">
      <div class="container">
        <h2 class="section-title">Lotes <span class="green">Disponibles</span></h2>
        <p class="section-subtitle">Elegí el lote perfecto para tu proyecto de vida o inversión</p>

        <!-- Selector de Etapas -->
        <div class="tabs-container">
          <button class="tab-btn" [class.active]="etapaSeleccionada === 2" (click)="setEtapa(2)">
            <span class="tab-tag">🚀 ¡Nuevo Lanzamiento · En Preventa!</span>
            <span class="tab-title">Etapa 2 · Manzana E</span>
            <span class="tab-desc">20 Lotes · Precios de preventa desde USD 5.500</span>
          </button>
          <button class="tab-btn" [class.active]="etapaSeleccionada === 1" (click)="setEtapa(1)">
            <span class="tab-tag tag-orange">⏳ Últimas 3 unidades</span>
            <span class="tab-title">Etapa 1 · Manzana B</span>
            <span class="tab-desc">Lotes Sobre Ruta · USD 10.000</span>
          </button>
        </div>

        <div class="lotes-grid">
          <div class="lote-card" *ngFor="let l of visible"
               [class.vendido]="l.estado==='vendido'"
               [class.reservado]="l.estado==='reservado'"
               [class.nodisponible]="l.estado==='nodisponible'">
            <div class="stamp stamp-vendido" *ngIf="l.estado==='vendido'">VENDIDO</div>
            <div class="stamp stamp-reservado" *ngIf="l.estado==='reservado'">RESERVADO</div>
            <div class="stamp stamp-nodisponible" *ngIf="l.estado==='nodisponible'">RESERVADO</div>
            <div class="lote-top">
              <div>
                <div class="lote-title-row">
                  <h3>Lote {{l.num}}</h3>
                  <span class="badge-mz" *ngIf="l.manzana">Mz {{l.manzana}}</span>
                  <span class="badge-mz badge-etapa1" *ngIf="!l.manzana">Etapa 1</span>
                </div>
                <p class="m2">{{formatM2(l.m2)}} m²</p>
              </div>
              <div class="lot-shape" [title]="l.manzana ? 'Geometría Lote ' + l.num + ' (Mz ' + l.manzana + ')' : 'Geometría Lote ' + l.num">
                <svg viewBox="0 0 60 36" fill="none">
                  <polygon [attr.points]="getShape(l)"
                           [attr.stroke]="getShapeStroke(l)"
                           stroke-width="1.6"
                           [attr.fill]="getShapeFill(l)"
                           stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <ng-container *ngIf="l.estado==='disponible'">
              <p class="ars" *ngIf="!cargando">$ {{precioARS(l)}}</p>
              <p class="ars cargando" *ngIf="cargando">Cotizando...</p>
              <p class="usd">USD {{precioUSD(l).toLocaleString('en-US')}}</p>
              <p class="dim">
                {{l.dim}}
                <span class="tag-irregular" *ngIf="l.dim.includes('irregular')">Forma irregular</span>
              </p>
              <div class="actions">
                <a [href]="whatsappLink(l)" target="_blank" class="btn-green btn-r" (click)="analytics.trackWhatsAppClick('lote_card')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
                  Reservar
                </a>
                <button class="btn-outline btn-s" (click)="sel=l; analytics.trackCalculadoraLink(l.num, precioUSD(l))">Simular cuotas</button>
              </div>
            </ng-container>
          </div>
        </div>
        <div class="show-more" *ngIf="!all && sorted.length > 6">
          <button class="btn-outline" (click)="all=true">Mostrar más lotes ({{sorted.length - 6}} restantes)</button>
        </div>
        <!-- Modal simulador -->
        <div class="overlay" *ngIf="sel" (click)="sel=null">
          <div class="modal" (click)="$event.stopPropagation()">
            <button class="close" (click)="sel=null">✕</button>
            <div class="modal-header-shape">
              <div class="lot-shape modal-shape">
                <svg viewBox="0 0 60 36" fill="none">
                  <polygon [attr.points]="getShape(sel)"
                           [attr.stroke]="getShapeStroke(sel)"
                           stroke-width="1.8"
                           [attr.fill]="getShapeFill(sel)"
                           stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style="margin-bottom:2px">Simulador — Lote {{sel.num}} {{sel.manzana ? '(Manzana ' + sel.manzana + ')' : '(Etapa 1)'}}</h3>
                <p class="modal-lot-info">{{formatM2(sel.m2)}} m² · {{sel.dim}}</p>
              </div>
            </div>
            <p class="mprecio">Precio total: <strong>$ {{precioARS(sel)}}</strong> <span class="usd-ref">(USD {{precioUSD(sel).toLocaleString('en-US')}})</span></p>
            <p class="minfo">100% financiado en UVA · 15% TNA · hasta 24 cuotas</p>
            <div class="cuotas">
              <div *ngFor="let c of [6,12,18,24]" class="cuota-row">
                <span>{{c}} cuotas</span>
                <span class="cv" (click)="analytics.trackCalculadoraSimulate(sel.num, precioUSD(sel), c)">$ {{calcCuota(c, sel)}} / mes</span>
              </div>
            </div>
            <p class="disclaimer">* Precio aproximado, varía según cotización USD y UVA.</p>
            <a [href]="whatsappModalLink(sel)" target="_blank" class="btn-green" style="margin-top:16px;justify-content:center;display:flex" (click)="analytics.trackWhatsAppClick('calculadora')">Consultar por WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .lotes-section { background:#050505; }
    .tabs-container { display:flex; justify-content:center; gap:16px; margin-bottom:36px; flex-wrap:wrap; }
    .tab-btn { background:#111; border:1px solid #222; border-radius:14px; padding:14px 24px; text-align:left; cursor:pointer; transition:all 0.25s; min-width:250px; display:flex; flex-direction:column; gap:4px; position:relative; }
    .tab-btn:hover { border-color:#333; background:#161616; }
    .tab-btn.active { border-color:#2ecc71; background:rgba(46,204,113,0.06); box-shadow:0 0 20px rgba(46,204,113,0.12); }
    .tab-tag { font-size:0.72rem; font-weight:700; color:#2ecc71; text-transform:uppercase; letter-spacing:0.5px; }
    .tab-tag.tag-orange { color:#e67e22; }
    .tab-title { font-family:'Montserrat',sans-serif; font-size:1.05rem; font-weight:800; color:#fff; }
    .tab-desc { font-size:0.8rem; color:#888; }
    .lote-title-row { display:flex; align-items:center; gap:8px; }
    .badge-mz { background:rgba(46,204,113,0.15); color:#2ecc71; border:1px solid rgba(46,204,113,0.3); font-size:0.68rem; font-weight:700; padding:2px 7px; border-radius:6px; letter-spacing:0.5px; text-transform:uppercase; }
    .badge-mz.badge-etapa1 { background:rgba(255,255,255,0.08); color:#aaa; border-color:rgba(255,255,255,0.15); }
    .lotes-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:32px; }
    .lote-card { background:#111; border:1px solid #222; border-radius:16px; padding:24px; position:relative; transition:border-color 0.2s; min-height:220px; }
    .lote-card:hover:not(.vendido):not(.nodisponible):not(.reservado){ border-color:#2ecc71; }
    .lote-card.vendido{ opacity:0.5; }
    .lote-card.reservado{ opacity:0.65; }
    .lote-card.nodisponible{ opacity:0.5; }
    .stamp { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-20deg); color:#fff; font-family:'Montserrat',sans-serif; font-weight:900; padding:8px 20px; border-radius:8px; border:3px solid #fff; z-index:2; letter-spacing:2px; }
    .stamp-vendido { background:#c0392b; font-size:1.4rem; }
    .stamp-reservado { background:#d35400; font-size:1.25rem; white-space:nowrap; }
    .stamp-nodisponible { background:#7f8c8d; font-size:0.95rem; white-space:nowrap; }
    .lote-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
    h3 { font-family:'Montserrat',sans-serif; font-size:1.3rem; font-weight:800; color:#fff; }
    .m2 { font-size:0.85rem; color:#777; margin-top:2px; }
    .lot-shape { width:64px; height:36px; display:flex; align-items:center; justify-content:center; }
    .lot-shape svg { width:100%; height:100%; transition:transform 0.25s; filter:drop-shadow(0 0 6px rgba(46,204,113,0.15)); }
    .lote-card:hover .lot-shape svg { transform:scale(1.1); }
    .ars { font-family:'Montserrat',sans-serif; font-size:1.5rem; font-weight:800; color:#fff; margin-bottom:2px; }
    .usd { font-size:0.82rem; color:#888; margin-bottom:2px; }
    .cargando { color:#555; font-size:1rem; }
    .usd-ref { font-size:0.8rem; color:#666; font-weight:400; }
    .dim { font-size:0.82rem; color:#666; margin-bottom:20px; display:flex; align-items:center; flex-wrap:wrap; gap:6px; }
    .tag-irregular { background:rgba(241,196,15,0.12); color:#f1c40f; border:1px solid rgba(241,196,15,0.3); font-size:0.68rem; padding:1px 6px; border-radius:4px; font-weight:600; }
    .actions { display:flex; gap:10px; flex-wrap:wrap; }
    .btn-r { font-size:0.82rem; padding:10px 14px; flex:1; justify-content:center; }
    .btn-s { font-size:0.82rem; padding:10px 14px; flex:1; justify-content:center; }
    .show-more { text-align:center; }
    .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:2000; display:flex; align-items:center; justify-content:center; padding:20px; }
    .modal { background:#111; border:1px solid #333; border-radius:20px; padding:32px; max-width:420px; width:100%; position:relative; }
    .close { position:absolute; top:16px; right:16px; background:#222; border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; }
    .modal-header-shape { display:flex; align-items:center; gap:14px; margin-bottom:14px; }
    .modal-shape { width:54px; height:32px; flex-shrink:0; }
    .modal-lot-info { font-size:0.8rem; color:#888; margin-top:2px; }
    .mprecio { color:#aaa; font-size:0.9rem; margin-bottom:4px; }
    .mprecio strong { color:#fff; }
    .minfo { font-size:0.78rem; color:#666; margin-bottom:20px; }
    .cuotas { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
    .cuota-row { display:flex; justify-content:space-between; background:#1a1a1a; padding:10px 14px; border-radius:8px; color:#aaa; font-size:0.88rem; }
    .cv { color:#2ecc71; font-weight:700; }
    .disclaimer { font-size:0.72rem; color:#555; margin-top:12px; font-style:italic; }
    @media(max-width:768px){ .lotes-grid{grid-template-columns:repeat(2,1fr)} .tab-btn{min-width:100%} }
    @media(max-width:500px){ .lotes-grid{grid-template-columns:1fr} }
  `]
})
export class LotesComponent implements OnInit {
  private http = inject(HttpClient);
  analytics = inject(AnalyticsService);

  etapaSeleccionada: number = 2;
  all = false;
  sel: Lote | null = null;
  tipoCambio: number | null = null;
  cargando = true;

  private readonly USD_PRECIO = 5500;
  private readonly TNA = 0.15;

  ngOnInit() {
    this.http.get<any>('https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD')
      .subscribe({
        next: (res) => {
          const det = res?.results?.[0]?.detalle?.[0];
          if (det?.tipoCotizacion != null) {
            this.tipoCambio = det.tipoCotizacion;
          }
          this.cargando = false;
        },
        error: () => { this.cargando = false; }
      });
  }

  setEtapa(etapa: number) {
    this.etapaSeleccionada = etapa;
    this.all = false;
  }

  precioUSD(lote: Lote): number { return lote.usd ?? this.USD_PRECIO; }

  precioARS(lote: Lote): string {
    if (!this.tipoCambio) return '—';
    return Math.round(this.precioUSD(lote) * this.tipoCambio).toLocaleString('es-AR');
  }

  calcCuota(n: number, lote: Lote): string {
    if (!this.tipoCambio) return '—';
    const total = this.precioUSD(lote) * this.tipoCambio;
    const financiado = total;
    const r = this.TNA / 12;
    const cuota = financiado * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return Math.round(cuota).toLocaleString('es-AR');
  }

  formatM2(m2: number): string {
    return m2.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  getShape(lote: Lote): string {
    if (lote.shape) return lote.shape;
    if (lote.etapa === 1) return '4,13 56,13 56,23 4,23'; // 12x80 horizontal
    return '6,9 54,9 54,27 6,27'; // 50x19.17 horizontal regular
  }

  getShapeStroke(lote: Lote): string {
    if (lote.estado === 'vendido') return '#c0392b';
    if (lote.estado === 'reservado') return '#d35400';
    return '#2ecc71';
  }

  getShapeFill(lote: Lote): string {
    if (lote.estado === 'vendido') return 'rgba(192, 57, 43, 0.12)';
    if (lote.estado === 'reservado') return 'rgba(211, 84, 0, 0.12)';
    return 'rgba(46, 204, 113, 0.12)';
  }

  whatsappLink(lote: Lote): string {
    const origen = lote.manzana ? `de la Manzana ${lote.manzana} (Etapa 2)` : `de la Etapa 1`;
    return `https://wa.me/5493764165357?text=Hola!+Quiero+reservar+el+Lote+${lote.num}+${encodeURIComponent(origen)}`;
  }

  whatsappModalLink(lote: Lote): string {
    const origen = lote.manzana ? `de la Manzana ${lote.manzana} (Etapa 2)` : `de la Etapa 1`;
    return `https://wa.me/5493764165357?text=Hola!+Quiero+consultar+por+el+Lote+${lote.num}+${encodeURIComponent(origen)}`;
  }

  lotes: Lote[] = [
    // --- ETAPA 1 (Legacy) ---
    { num: 1, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 2, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 3, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 4, dim: '12×80', m2: 1000, estado: 'nodisponible', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 5, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 6, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 7, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 8, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 9, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 10, dim: '12×80', m2: 1000, estado: 'disponible', usd: 10000, etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 11, dim: '12×80', m2: 1000, estado: 'vendido', etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 12, dim: '12×80', m2: 1000, estado: 'disponible', usd: 10000, etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 13, dim: '12×80', m2: 1000, estado: 'disponible', usd: 10000, etapa: 1, shape: '4,13 56,13 56,23 4,23' },
    { num: 14, dim: '12×80', m2: 1000, estado: 'reservado', usd: 6000, etapa: 1, shape: '4,13 56,13 56,23 4,23' },

    // --- ETAPA 2 (Manzana E) ---
    // Lotes 1 al 6: Formas geométricas reales según plano catastral (Manzana E)
    { num: 1, dim: '16×57 irregular', m2: 968.35, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,4 40,7 40,32 20,32' },
    { num: 2, dim: '17×53 irregular', m2: 792.74, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,6 40,14 40,32 20,32' },
    { num: 3, dim: '17×39 irregular', m2: 544.50, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,13 40,22 40,32 20,32' },
    { num: 4, dim: '17×48 irregular', m2: 945.25, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,3 40,10 40,32 20,32' },
    { num: 5, dim: '17×48 irregular', m2: 694.30, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '20,8 40,18 40,32 20,32' },
    { num: 6, dim: '38×33 irregular', m2: 644.57, estado: 'disponible', usd: 5500, etapa: 2, manzana: 'E', shape: '12,12 48,21 48,32 12,32' },
    // Lotes 7 al 20: Lotes rectangulares regulares 50x19
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

  private readonly orden: Record<EstadoLote, number> = { disponible: 0, reservado: 1, vendido: 2, nodisponible: 3 };

  get filtrados(): Lote[] {
    return this.lotes.filter(l => l.etapa === this.etapaSeleccionada);
  }

  get sorted(): Lote[] {
    return [...this.filtrados].sort((a, b) => {
      const diff = this.orden[a.estado] - this.orden[b.estado];
      if (diff !== 0) return diff;
      return a.num - b.num;
    });
  }

  get visible(): Lote[] {
    return this.all ? this.sorted : this.sorted.slice(0, 6);
  }
}
