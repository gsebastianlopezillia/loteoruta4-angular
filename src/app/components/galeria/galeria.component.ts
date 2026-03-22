import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="galeria" class="section gal-section">
      <div class="container">
        <h2 class="section-title">Conocé el <span class="green">Proyecto</span></h2>
        <p class="section-subtitle">Imágenes reales del loteo y su entorno natural</p>
        <div class="main-slide">
          <button class="nav prev" (click)="prev()">‹</button>
          <div class="slide-wrap">
            <img [src]="slides[cur].url" [alt]="slides[cur].title" class="slide-img">
            <div class="caption"><h4>{{slides[cur].title}}</h4><p>{{slides[cur].desc}}</p></div>
          </div>
          <button class="nav next" (click)="next()">›</button>
        </div>
        <div class="dots">
          <span *ngFor="let s of slides; let i=index" class="dot" [class.active]="i===cur" (click)="cur=i"></span>
        </div>
        <div class="thumbs">
          <img *ngFor="let s of slides; let i=index" [src]="s.url" [alt]="s.title" class="thumb" [class.active]="i===cur" (click)="cur=i">
        </div>
        <div class="wa-cta">
          <a href="https://wa.me/5437641653757" target="_blank" class="btn-green">📞 ¿Te convenció? Consultá por WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gal-section { background:#050505; }
    .main-slide { position:relative; border-radius:16px; overflow:hidden; margin-bottom:16px; }
    .slide-wrap { position:relative; }
    .slide-img { width:100%; height:420px; object-fit:cover; display:block; }
    .caption { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent,rgba(0,0,0,0.8)); padding:32px 24px 20px; }
    .caption h4 { font-family:'Montserrat',sans-serif; font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:4px; }
    .caption p { font-size:0.85rem; color:#ccc; }
    .nav { position:absolute; top:50%; transform:translateY(-50%); z-index:2; background:rgba(46,204,113,0.85); color:#fff; border:none; width:40px; height:40px; border-radius:50%; font-size:1.4rem; cursor:pointer; line-height:1; }
    .nav:hover { background:#27ae60; }
    .prev { left:14px; } .next { right:14px; }
    .dots { display:flex; gap:6px; justify-content:center; margin-bottom:16px; }
    .dot { width:8px; height:8px; border-radius:50%; background:#444; cursor:pointer; }
    .dot.active { background:#2ecc71; }
    .thumbs { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; margin-bottom:32px; }
    .thumb { width:100px; height:68px; object-fit:cover; border-radius:8px; cursor:pointer; border:2px solid transparent; flex-shrink:0; opacity:0.6; transition:all 0.2s; }
    .thumb.active,.thumb:hover { border-color:#2ecc71; opacity:1; }
    .wa-cta { text-align:center; }
    @media(max-width:600px){ .slide-img{height:260px} }
  `]
})
export class GaleriaComponent {
  cur = 0;
  slides = [
    {url:'assets/imgs/loteo_vista_general_1.jpeg',title:'Vista general del loteo',desc:'Perspectiva completa del proyecto Ruta 4 y su ubicación privilegiada'},
    {url:'assets/imgs/loteo_vista_aerea_2.jpeg',title:'Vista aérea',desc:'Vista aérea del loteo y su entorno natural'},
    {url:'assets/imgs/loteo_caminos_internos_3.jpeg',title:'Caminos internos',desc:'Accesos internos del loteo bien definidos'},
    {url:'assets/imgs/loteo_monte_nativo_4.jpeg',title:'Monte nativo en recuperación',desc:'Vegetación autóctona que brinda sombra y frescura natural'},
    {url:'assets/imgs/loteo_acceso_principal_5.jpeg',title:'Acceso principal — Ruta 4',desc:'Frente directo a Ruta Provincial 4, acceso garantizado'},
    {url:'assets/imgs/loteo_vias_circulacion_6.jpeg',title:'Vías de circulación',desc:'Infraestructura vial interna del loteo'},
    {url:'assets/imgs/loteo_senderos_peatonales_7.jpeg',title:'Senderos peatonales',desc:'Senderos para disfrutar el entorno natural a pie'},
    {url:'assets/imgs/loteo_zonas_comunes_8.jpeg',title:'Zonas comunes',desc:'Espacios compartidos para el disfrute de los propietarios'},
    {url:'assets/imgs/loteo_area_verde_9.jpeg',title:'Área verde',desc:'Amplias áreas verdes integradas al proyecto'},
    {url:'assets/imgs/loteo_biodiversidad_10.jpeg',title:'Biodiversidad',desc:'Flora y fauna autóctona de Misiones'},
    {url:'assets/imgs/loteo_espacios_naturales_11.jpeg',title:'Espacios naturales',desc:'Paisaje misionero único con biodiversidad natural'},
    {url:'assets/imgs/loteo_ubicacion_estrategica_12.jpeg',title:'Ubicación estratégica',desc:'Conectividad perfecta entre naturaleza y servicios'},
  ];
  prev(){ this.cur=(this.cur-1+this.slides.length)%this.slides.length; }
  next(){ this.cur=(this.cur+1)%this.slides.length; }
}
