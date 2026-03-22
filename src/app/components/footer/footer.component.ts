import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer id="footer" class="footer">
      <div class="badges-bar">
        <div class="container br">
          <span class="badge">📄 Título listo</span>
          <span class="badge">🏠 Escrituración directa</span>
          <span class="badge">💧 Servicios en puerta</span>
        </div>
      </div>
      <div class="container footer-grid">
        <div class="brand">
          <h3>Loteo Ruta 4</h3>
          <p>Tu refugio en Misiones. Terrenos premium con título perfecto en Ruta Provincial 4, Almafuerte.</p>
        </div>
        <div class="contact">
          <h4>Contacto</h4>
          <a href="tel:+5437641653757" class="citem">📞 +54 3764 165357</a>
          <a href="https://maps.app.goo.gl/TRfQusesqEKqRUPG6" target="_blank" class="citem">📍 Ruta Provincial 4, Almafuerte, Misiones</a>
        </div>
      </div>
      <div class="container bottom">
        <p>© 2026 Loteo Ruta 4 - loteoruta4.com - Todos los derechos reservados</p>
        <p class="tag">¡No dejes que se escapen los lotes!</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background:#050505; border-top:1px solid #1a1a1a; }
    .badges-bar { background:#0a0a0a; border-bottom:1px solid #1a1a1a; padding:16px 0; }
    .br { display:flex; justify-content:center; gap:40px; flex-wrap:wrap; }
    .badge { display:flex; align-items:center; gap:8px; font-family:'Montserrat',sans-serif; font-size:0.85rem; font-weight:600; color:#ccc; }
    .footer-grid { display:grid; grid-template-columns:2fr 1fr; gap:48px; padding:48px 24px 40px; }
    h3 { font-family:'Montserrat',sans-serif; font-size:1.3rem; font-weight:800; color:#2ecc71; margin-bottom:12px; }
    h4 { font-family:'Montserrat',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:16px; }
    .brand p { font-size:0.88rem; color:#777; line-height:1.6; }
    .contact { display:flex; flex-direction:column; gap:4px; }
    .citem { font-size:0.87rem; color:#888; padding:6px 0; display:block; transition:color 0.2s; }
    .citem:hover { color:#fff; }
    .bottom { border-top:1px solid #1a1a1a; padding:20px 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; }
    .bottom p { font-size:0.78rem; color:#555; }
    .tag { color:#2ecc71 !important; font-style:italic; }
    @media(max-width:800px){ .footer-grid{grid-template-columns:1fr;gap:32px} .bottom{flex-direction:column;text-align:center} .br{gap:20px} }
  `]
})
export class FooterComponent {}
