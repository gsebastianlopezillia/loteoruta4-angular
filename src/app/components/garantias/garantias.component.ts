import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garantias',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="garantias" class="section garantias-section">
      <div class="container">
        <div class="garantias-layout">
          <div class="intro-col">
            <p class="intro-text">
              ¿Harto de ver tu plata evaporarse en alquiler o inflación en la ciudad?<br><br>
              Imaginate jubilado o trabajando remote en tu propio paraíso: monte nativo fresco, arroyo a 200m,
              <span class="green">1000m² que parecen un reino</span> (ideal para casa familiar o inversión).
            </p>
          </div>
          <div class="list-col">
            <h2 class="garantias-title">Garantías absolutas<span class="green">:</span></h2>
            <ul class="garantias-list">
              <li *ngFor="let g of garantias" class="garantia-item">
                <span class="check">✓</span>
                <span><strong>{{g.title}}</strong> — {{g.desc}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .garantias-section { background:#000; padding:80px 0; }
    .garantias-layout { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
    .intro-text { font-size:1.05rem; color:#ccc; line-height:1.8; }
    .garantias-title { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800; margin-bottom:28px; }
    .garantias-list { list-style:none; display:flex; flex-direction:column; gap:14px; }
    .garantia-item { display:flex; align-items:flex-start; gap:14px; font-size:0.97rem; color:#ccc; }
    .check { flex-shrink:0; width:30px; height:30px; border-radius:50%; background:rgba(46,204,113,0.15); border:1.5px solid #2ecc71; display:flex; align-items:center; justify-content:center; color:#2ecc71; margin-top:2px; font-weight:700; }
    strong { color:#fff; font-weight:600; }
    @media(max-width:768px) {
      .garantias-layout { grid-template-columns:1fr; gap:32px; }
      .intro-text { text-align:center; }
    }
  `]
})
export class GarantiasComponent {
  garantias = [
    {title:'Título listo para escriturar',desc:'Tratas con los titulares directos'},
    {title:'Ruta asfaltada frente',desc:'No precisás una 4x4'},
    {title:'Servicios agua/luz en puerta',desc:'Listo para construir'},
    {title:'Escuela/colectivo a 150m',desc:'Ideal para familias'},
    {title:'4km de Bonpland y 15km de Alem',desc:'Cerca de todo sin ruido'},
  ];
}
