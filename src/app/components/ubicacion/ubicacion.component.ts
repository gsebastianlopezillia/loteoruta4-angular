import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="ubicacion" class="section ubicacion-section">
      <div class="container">
        <h2 class="section-title">Ubicación <span class="green">Privilegiada</span></h2>
        <p class="section-subtitle">Ruta Provincial 4, Almafuerte, Misiones - El equilibrio perfecto entre naturaleza y conectividad</p>
        <div class="ubicacion-grid">
          <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14736!2d-55.479!3d-27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1680000000000!5m2!1ses!2sar" width="100%" height="100%" style="border:0" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="feat-cards">
            <div *ngFor="let f of feats" class="feat-card">
              <div class="feat-icon">{{f.icon}}</div>
              <div><h4>{{f.title}}</h4><p>{{f.desc}}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ubicacion-section { background:#000; }
    .ubicacion-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
    .map-container { height:340px; border-radius:16px; overflow:hidden; border:1px solid #222; }
    .feat-cards { display:flex; flex-direction:column; gap:16px; }
    .feat-card { background:#111; border:1px solid #222; border-radius:12px; padding:18px 20px; display:flex; align-items:flex-start; gap:14px; }
    .feat-icon { width:38px; height:38px; background:rgba(46,204,113,0.12); border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem; }
    h4 { font-family:'Montserrat',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:4px; }
    p { font-size:0.85rem; color:#999; }
    @media(max-width:700px){ .ubicacion-grid{grid-template-columns:1fr} .map-container{height:260px} }
  `]
})
export class UbicacionComponent {
  feats = [
    {icon:'🛣️',title:'Frente directo a Ruta 4 asfaltada',desc:'Acceso fácil todo el año y alta valorización a futuro'},
    {icon:'🏫',title:'A 150m de escuela y parada de colectivo',desc:'Ideal para familias con niños o proyectos comunitarios'},
    {icon:'🏞️',title:'Arroyo a 200m',desc:'Naturaleza pura para refrescarte y conectar con el entorno'},
    {icon:'🏙️',title:'4km de Bonpland, 15km de Alem',desc:'Cerca de servicios y comercios sin el ruido de la ciudad'},
  ];
}
