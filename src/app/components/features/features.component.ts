import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="features" class="section feat-section">
      <div class="container">
        <h2 class="section-title">¿Por qué <span class="green">Loteo Ruta 4</span>?</h2>
        <p class="section-subtitle">Todo lo que necesitás para tu proyecto de vida o inversión</p>
        <div class="grid">
          <div class="card" *ngFor="let f of feats">
            <div class="icon">{{f.icon}}</div>
            <h3>{{f.title}}</h3>
            <p>{{f.desc}}</p>
            <a *ngIf="f.link" [href]="f.link" target="_blank" class="link">Ver Noticia →</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .feat-section { background:#000; }
    .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .card { background:#111; border:1px solid #1e1e1e; border-radius:16px; padding:24px 20px; transition:border-color 0.2s,transform 0.2s; }
    .card:hover { border-color:rgba(46,204,113,0.4); transform:translateY(-4px); }
    .icon { width:46px; height:46px; background:rgba(46,204,113,0.12); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin-bottom:14px; }
    h3 { font-family:'Montserrat',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:8px; line-height:1.3; }
    p { font-size:0.83rem; color:#888; line-height:1.5; }
    .link { display:inline-block; margin-top:10px; font-size:0.82rem; color:#2ecc71; font-weight:600; }
    @media(max-width:900px){ .grid{grid-template-columns:repeat(2,1fr)} }
    @media(max-width:500px){ .grid{grid-template-columns:1fr} }
  `]
})
export class FeaturesComponent {
  feats = [
    {icon:'🌿',title:'Monte Nativo en Recuperación',desc:'Sombra natural, frescura y ecosistema vivo para disfrutar todo el año',link:null},
    {icon:'🪨',title:'Suelo Premium',desc:'6a pedregoso que filtra, al ser en pendiente, imposible inundación',link:null},
    {icon:'📈',title:'Múltiples Posibilidades',desc:'Casa familiar, cabañas turísticas, negocio rutero o renta pasiva forestación',link:null},
    {icon:'🚀',title:'Valorización Segura',desc:'El nuevo puente internacional impulsará la zona exponencialmente',link:'https://www.primeraedicion.com.ar/nota/101074427/el-puente-internacional-san-javier-porto-xavier-ya-entro-en-su-fase-operativa/'},
    {icon:'📶',title:'Servicios Completos',desc:'Agua en puerta, luz sobre ruta, internet de calidad para trabajo remoto',link:null},
    {icon:'📄',title:'Documentación Perfecta',desc:'Títulos 100% en regla, escrituración inmediata sin trabas burocráticas',link:null},
  ];
}
