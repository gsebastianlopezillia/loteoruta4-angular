import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="hero" style="background-image:url('assets/imgs/8ab312c23624e8532d8f21bf366893fe3bf6de41.png')">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">¡Tu lote te espera!</h1>
        <p class="hero-sub">con Título, Asfalto, Agua</p>
        <div class="hero-badge">¡Últimos 4 lotes! Se agotan rápido — reservá ahora</div>
        <a href="https://wa.me/5437641653757" target="_blank" class="btn-green hero-cta" (click)="analytics.trackWhatsAppClick('hero')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
          RESERVAR MI LOTE
        </a>
      </div>
    </section>
  `,
  styles: [`
    .hero { position:relative; min-height:90vh; display:flex; align-items:center;
      background-position:center; background-size:cover; background-repeat:no-repeat; }
    .hero-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.7)); }
    .hero-content { position:relative; z-index:1; text-align:center; display:flex; flex-direction:column; align-items:center; gap:20px; padding:60px 0; }
    .hero-title { font-family:'Montserrat',sans-serif; font-size:clamp(2rem,6vw,4rem); font-weight:900; color:#fff; line-height:1.1; max-width:900px; text-shadow:0 2px 20px rgba(0,0,0,0.5); }
    .hero-sub { font-size:1.1rem; color:rgba(255,255,255,0.85); }
    .hero-badge { border:2px solid rgba(255,255,255,0.5); border-radius:50px; padding:10px 28px; font-family:'Montserrat',sans-serif; font-size:0.9rem; font-weight:600; color:#fff; }
    .hero-cta { font-size:0.95rem; padding:16px 36px; letter-spacing:1px; box-shadow:0 8px 30px rgba(46,204,113,0.4); }
  `]
})
export class HeroComponent {
  analytics = inject(AnalyticsService);
}
