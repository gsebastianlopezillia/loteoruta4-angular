import { Component, HostListener, inject } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { CommonModule } from '@angular/common';

const WA = 'https://wa.me/5493764165357';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled">
      <div class="container nav-inner">
        <a class="logo" href="#" (click)="nav('hero',$event)">Loteo Ruta 4</a>
        <ul class="nav-links" [class.open]="menuOpen">
          <li><a href="#" (click)="nav('lotes',$event)">Lotes</a></li>
          <li><a href="#" (click)="nav('ubicacion',$event)">Ubicación</a></li>
          <li><a href="#" (click)="nav('galeria',$event)">Fotos</a></li>
          <li><a href="#" (click)="nav('video',$event)">Video</a></li>
          <li><a href="#" (click)="nav('faq',$event)">FAQ</a></li>
          <li><a href="#" (click)="nav('features',$event)">Por qué</a></li>
          <li><a href="#" (click)="nav('reviews',$event)">Reviews</a></li>
          <li><a href="#" (click)="nav('footer',$event)">Contacto</a></li>
        </ul>
        <a [href]="waLink" target="_blank" class="btn-green btn-contactar" (click)="analytics.trackWhatsAppClick('nav')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
          CONTACTAR
        </a>
        <button class="hamburger" (click)="menuOpen=!menuOpen" [class.active]="menuOpen" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
      border-bottom: 1px solid transparent; transition: all 0.3s;
    }
    .navbar.scrolled { background: rgba(0,0,0,0.97); border-bottom-color: #222; }
    .nav-inner { display: flex; align-items: center; gap: 20px; height: 64px; }
    .logo { font-family:'Montserrat',sans-serif; font-weight:800; font-size:1.15rem; color:#2ecc71; white-space:nowrap; }
    .nav-links { display:flex; list-style:none; gap:2px; flex:1; justify-content:center; }
    .nav-links a { font-family:'Montserrat',sans-serif; font-size:0.8rem; font-weight:500; color:#ccc; padding:6px 9px; border-radius:6px; transition:color 0.2s,background 0.2s; white-space:nowrap; }
    .nav-links a:hover { color:#fff; background:rgba(255,255,255,0.08); }
    .btn-contactar {
      font-family:'Montserrat',sans-serif; font-size:0.78rem; font-weight:700;
      padding:9px 18px; white-space:nowrap; flex-shrink:0;
      display:inline-flex; align-items:center; gap:7px; letter-spacing:0.04em;
    }
    .btn-contactar svg { flex-shrink:0; }
    .hamburger { display:none; flex-direction:column; justify-content:center; gap:5px; width:36px; height:36px; background:transparent; border:none; cursor:pointer; padding:4px; flex-shrink:0; }
    .hamburger span { display:block; width:22px; height:2px; background:#fff; border-radius:2px; transition:all 0.25s; }
    .hamburger.active span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity:0; }
    .hamburger.active span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
    /* Tablet compacto: nav visible, links más chicos */
    @media(max-width:960px) {
      .nav-links { gap:0; }
      .nav-links a { font-size:0.72rem; padding:5px 6px; }
      .btn-contactar { font-size:0.72rem; padding:7px 12px; }
    }
    /* Mobile: hamburger */
    @media(max-width:640px) {
      .hamburger { display:flex; }
      /* sin nav-links visible, btn-contactar empuja al margen derecho */
      .btn-contactar { margin-left:auto; font-size:0.72rem; padding:7px 12px; }
      .nav-links {
        display:none; position:absolute; top:64px; left:0; right:0;
        flex-direction:column; gap:0; background:rgba(0,0,0,0.97);
        border-bottom:1px solid #222; padding:8px 0;
      }
      .nav-links.open { display:flex; }
      .nav-links li a { display:block; padding:12px 24px; font-size:0.95rem; border-radius:0; }
    }
  `]
})
export class NavbarComponent {
  analytics = inject(AnalyticsService);
  scrolled = false;
  menuOpen = false;
  waLink = WA;

  @HostListener('window:scroll') onScroll() { this.scrolled = window.scrollY > 30; }

  nav(id: string, event: Event) {
    event.preventDefault();
    this.menuOpen = false;
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 64; // altura navbar
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
