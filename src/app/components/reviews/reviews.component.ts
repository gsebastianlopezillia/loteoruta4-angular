import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="reviews" class="section rev-section">
      <div class="container">
        <h2 class="section-title">Lo que dicen quienes <span class="green">ya compraron</span></h2>
        <!-- Desktop: grid de 3 cards -->
        <div class="reviews-grid desktop-reviews">
          <div class="card" *ngFor="let r of reviews">
            <p class="author">{{r.author}}</p>
            <blockquote>{{r.text}}</blockquote>
          </div>
        </div>
        <!-- Mobile: carousel -->
        <div class="carousel mobile-carousel">
          <button class="nav" (click)="prev()">‹</button>
          <div class="card">
            <p class="author">{{reviews[cur].author}}</p>
            <blockquote>{{reviews[cur].text}}</blockquote>
          </div>
          <button class="nav" (click)="next()">›</button>
        </div>
        <div class="dots mobile-carousel">
          <span *ngFor="let r of reviews; let i=index" class="dot" [class.active]="i===cur" (click)="cur=i"></span>
        </div>
        <div class="cta-box">
          <h2 class="section-title">¿Listo para una <span class="green">buena inversión</span>?</h2>
          <p class="section-subtitle">Consultá disponibilidad ahora</p>
          <a href="https://wa.me/5493764165357" target="_blank" class="btn-green cta-btn">📞 Reservar mi lote</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .rev-section { background:#000; }
    .reviews-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:48px; }
    .card { background:#111; border:1px solid #222; border-radius:16px; padding:28px 32px; }
    .author { font-family:'Montserrat',sans-serif; font-size:0.78rem; font-weight:700; color:#2ecc71; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:16px; }
    blockquote { font-size:0.92rem; color:#ccc; line-height:1.7; }
    .carousel { display:flex; align-items:center; gap:16px; margin-bottom:20px; }
    .carousel .card { flex:1; padding:36px 40px; }
    .nav { flex-shrink:0; background:#1a1a1a; border:1px solid #333; color:#fff; width:40px; height:40px; border-radius:50%; font-size:1.4rem; cursor:pointer; transition:background 0.2s; }
    .nav:hover { background:#2ecc71; border-color:#2ecc71; }
    .dots { display:flex; gap:6px; justify-content:center; margin-bottom:48px; }
    .dot { width:8px; height:8px; border-radius:50%; background:#333; cursor:pointer; }
    .dot.active { background:#2ecc71; }
    .cta-box { text-align:center; padding:40px 0; }
    .cta-btn { font-size:1rem; padding:16px 36px; margin:0 auto; }
    .mobile-carousel { display:none; }
    @media(max-width:900px) {
      .desktop-reviews { display:none; }
      .mobile-carousel { display:flex; }
      .dots.mobile-carousel { display:flex; }
    }
    @media(max-width:600px) { .carousel .card { padding:24px 20px; } }
  `]
})
export class ReviewsComponent {
  cur = 0;
  reviews = [
    {author:'M.G., Directora de escuela - La Plata',text:'El lote está ubicado en un lugar estratégico y accesible, de fácil acceso a la ruta asfaltada. Conectando con la ciudad y otros puntos de interés. Ideal para vivienda y quinta y proyectos al aire libre.'},
    {author:'C.R., Emprendedor - Buenos Aires',text:'Excelente inversión. El proceso de compra fue muy claro y rápido. El título en regla fue clave para mí. Totalmente recomendable para quienes buscan tranquilidad y naturaleza.'},
    {author:'M.P., Trabajador remoto - Córdoba',text:'Compré para trabajar desde ahí en el futuro. La conectividad con Starlink es increíble y la naturaleza es lo que siempre soñé. Muy fácil el trámite con los titulares directos.'},
    {author:'A.V., Familia - Rosario',text:'Buscábamos un lugar tranquilo para la familia. La escuela a 150m fue determinante. El arroyo es hermoso y los vecinos son muy amables. ¡Felices con la compra!'},
    {author:'J.F., Inversor - CABA',text:'La valorización que va a tener la zona con el puente internacional es enorme. Compré como inversión y estoy muy confiado en el retorno. Proceso transparente y seguro.'},
  ];
  prev(){ this.cur=(this.cur-1+this.reviews.length)%this.reviews.length; }
  next(){ this.cur=(this.cur+1)%this.reviews.length; }
}
