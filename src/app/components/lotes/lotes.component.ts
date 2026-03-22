import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '../../services/analytics.service';

type EstadoLote = 'disponible' | 'vendido' | 'nodisponible';
interface Lote { num:number; dim:string; estado:EstadoLote; usd?:number; }

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="lotes" class="section lotes-section">
      <div class="container">
        <h2 class="section-title">Lotes <span class="green">Disponibles</span></h2>
        <p class="section-subtitle">Elegí el lote perfecto para tu proyecto de vida</p>
        <div class="lotes-grid">
          <div class="lote-card" *ngFor="let l of visible"
               [class.vendido]="l.estado==='vendido'"
               [class.nodisponible]="l.estado==='nodisponible'">
            <div class="stamp stamp-vendido" *ngIf="l.estado==='vendido'">VENDIDO</div>
            <div class="stamp stamp-nodisponible" *ngIf="l.estado==='nodisponible'">RESERVADO</div>
            <div class="lote-top">
              <div><h3>Lote {{l.num}}</h3><p class="m2">1000 mts²</p></div>
              <div class="lot-shape">
                <svg viewBox="0 0 60 30" fill="none"><polygon points="30,2 58,16 30,28 2,16" stroke="#2ecc71" stroke-width="1.5" fill="none"/></svg>
              </div>
            </div>
            <ng-container *ngIf="l.estado==='disponible'">
              <p class="ars" *ngIf="!cargando">$ {{precioARS(l)}}</p>
              <p class="ars cargando" *ngIf="cargando">Cotizando...</p>
              <p class="usd">USD {{precioUSD(l).toLocaleString('en-US')}}</p>
              <p class="dim">{{l.dim}}</p>
              <div class="actions">
                <a href="https://wa.me/5493764165357?text=Hola!+Quiero+reservar+el+Lote+{{l.num}}" target="_blank" class="btn-green btn-r" (click)="analytics.trackWhatsAppClick('lote_card')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
                  Reservar
                </a>
                <button class="btn-outline btn-s" (click)="sel=l; analytics.trackCalculadoraLink(l.num, precioUSD(l))">Simular cuotas</button>
              </div>
            </ng-container>
          </div>
        </div>
        <div class="show-more" *ngIf="!all"><button class="btn-outline" (click)="all=true">Mostrar más lotes</button></div>
        <!-- Modal simulador -->
        <div class="overlay" *ngIf="sel" (click)="sel=null">
          <div class="modal" (click)="$event.stopPropagation()">
            <button class="close" (click)="sel=null">✕</button>
            <h3>Simulador de cuotas — Lote {{sel.num}}</h3>
            <p class="mprecio">Precio total: <strong>$ {{precioARS(sel)}}</strong> <span class="usd-ref">(USD {{precioUSD(sel).toLocaleString('en-US')}})</span></p>
            <p class="minfo">100% financiado en UVA · 15% TNA · hasta 24 cuotas</p>
            <div class="cuotas">
              <div *ngFor="let c of [6,12,18,24]" class="cuota-row">
                <span>{{c}} cuotas</span>
                <span class="cv" (click)="analytics.trackCalculadoraSimulate(sel.num, precioUSD(sel), c)">$ {{calcCuota(c, sel)}} / mes</span>
              </div>
            </div>
            <p class="disclaimer">* Precio aproximado, varía según cotización USD y UVA.</p>
            <a href="https://wa.me/5493764165357" target="_blank" class="btn-green" style="margin-top:16px;justify-content:center;display:flex" (click)="analytics.trackWhatsAppClick('calculadora')">Consultar por WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .lotes-section { background:#050505; }
    .lotes-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:32px; }
    .lote-card { background:#111; border:1px solid #222; border-radius:16px; padding:24px; position:relative; transition:border-color 0.2s; }
    .lote-card:hover:not(.vendido):not(.nodisponible){ border-color:#2ecc71; }
    .lote-card.vendido{ opacity:0.5; }
    .lote-card.nodisponible{ opacity:0.5; }
    .stamp { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-20deg); color:#fff; font-family:'Montserrat',sans-serif; font-weight:900; padding:8px 20px; border-radius:8px; border:3px solid #fff; z-index:2; letter-spacing:2px; }
    .stamp-vendido { background:#c0392b; font-size:1.4rem; }
    .stamp-nodisponible { background:#7f8c8d; font-size:0.95rem; white-space:nowrap; }
    .lote-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
    h3 { font-family:'Montserrat',sans-serif; font-size:1.3rem; font-weight:800; color:#fff; }
    .m2 { font-size:0.85rem; color:#777; margin-top:2px; }
    .lot-shape svg { width:60px; height:30px; opacity:0.6; }
    .ars { font-family:'Montserrat',sans-serif; font-size:1.5rem; font-weight:800; color:#fff; margin-bottom:2px; }
    .usd { font-size:0.82rem; color:#888; margin-bottom:2px; }
    .cargando { color:#555; font-size:1rem; }
    .usd-ref { font-size:0.8rem; color:#666; font-weight:400; }
    .dim { font-size:0.82rem; color:#666; margin-bottom:20px; }
    .actions { display:flex; gap:10px; flex-wrap:wrap; }
    .btn-r { font-size:0.82rem; padding:10px 14px; flex:1; justify-content:center; }
    .btn-s { font-size:0.82rem; padding:10px 14px; flex:1; justify-content:center; }
    .show-more { text-align:center; }
    .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:2000; display:flex; align-items:center; justify-content:center; padding:20px; }
    .modal { background:#111; border:1px solid #333; border-radius:20px; padding:32px; max-width:420px; width:100%; position:relative; }
    .close { position:absolute; top:16px; right:16px; background:#222; border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer; }
    .modal h3 { font-family:'Montserrat',sans-serif; font-size:1.1rem; margin-bottom:12px; }
    .mprecio { color:#aaa; font-size:0.9rem; margin-bottom:4px; }
    .mprecio strong { color:#fff; }
    .minfo { font-size:0.78rem; color:#666; margin-bottom:20px; }
    .cuotas { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
    .cuota-row { display:flex; justify-content:space-between; background:#1a1a1a; padding:10px 14px; border-radius:8px; color:#aaa; font-size:0.88rem; }
    .cv { color:#2ecc71; font-weight:700; }
    .disclaimer { font-size:0.72rem; color:#555; margin-top:12px; font-style:italic; }
    @media(max-width:768px){ .lotes-grid{grid-template-columns:repeat(2,1fr)} }
    @media(max-width:500px){ .lotes-grid{grid-template-columns:1fr} }
  `]
})
export class LotesComponent implements OnInit {
  private http = inject(HttpClient);
  analytics = inject(AnalyticsService);

  all = false;
  sel: Lote | null = null;
  tipoCambio: number | null = null;
  cargando = true;

  private readonly USD_PRECIO = 5000;
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

  lotes: Lote[] = [
    {num:1,  dim:'12×80', estado:'nodisponible'},
    {num:2,  dim:'12×80', estado:'nodisponible'},
    {num:3,  dim:'12×80', estado:'nodisponible'},
    {num:4,  dim:'12×80', estado:'nodisponible'},
    {num:5,  dim:'12×80', estado:'vendido'},
    {num:6,  dim:'12×80', estado:'vendido'},
    {num:7,  dim:'12×80', estado:'vendido'},
    {num:8,  dim:'12×80', estado:'vendido'},
    {num:9,  dim:'12×80', estado:'vendido'},
    {num:10, dim:'12×80', estado:'disponible'},
    {num:11, dim:'12×80', estado:'vendido'},
    {num:12, dim:'12×80', estado:'disponible'},
    {num:13, dim:'12×80', estado:'disponible'},
    {num:14, dim:'12×80', estado:'disponible', usd:6000},
  ];
  private readonly orden: Record<EstadoLote, number> = { disponible:0, vendido:1, nodisponible:2 };
  get sorted(){ return [...this.lotes].sort((a,b) => this.orden[a.estado] - this.orden[b.estado]); }
  get visible(){ return this.all ? this.sorted : this.sorted.slice(0,6); }
}
