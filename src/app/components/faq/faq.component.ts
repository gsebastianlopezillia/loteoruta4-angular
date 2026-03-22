import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="section faq-section">
      <div class="container">
        <h2 class="section-title">Preguntas <span class="green">Frecuentes</span></h2>
        <p class="section-subtitle">Todas las respuestas que necesitás para tomar tu decisión</p>
        <div class="faq-list">
          <div class="item" *ngFor="let f of faqs; let i=index" [class.open]="open===i">
            <button class="q" (click)="open = open===i ? null : i">
              <span>{{f.q}}</span>
              <span class="chev">{{open===i ? '∧' : '∨'}}</span>
            </button>
            <div class="a" *ngIf="open===i" [innerHTML]="f.a"></div>
          </div>
        </div>
        <div class="footer-cta">
          <p>¿Tenés más preguntas? Contactanos directamente</p>
          <a href="https://wa.me/5437641653757" target="_blank" class="btn-green">📞 Consultar por WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-section { background:#050505; }
    .faq-list { max-width:800px; margin:0 auto 40px; display:flex; flex-direction:column; gap:8px; }
    .item { background:#111; border:1px solid #1e1e1e; border-radius:12px; overflow:hidden; transition:border-color 0.2s; }
    .item.open { border-color:rgba(46,204,113,0.3); }
    .q { width:100%; display:flex; justify-content:space-between; align-items:center; padding:18px 22px; background:none; border:none; color:#fff; font-family:'Montserrat',sans-serif; font-size:0.95rem; font-weight:600; cursor:pointer; text-align:left; gap:16px; }
    .q:hover { color:#2ecc71; }
    .chev { flex-shrink:0; color:#2ecc71; }
    .a { padding:0 22px 18px; font-size:0.9rem; color:#aaa; line-height:1.7; }
    .a ::ng-deep ul { padding-left:20px; margin-top:8px; }
    .a ::ng-deep li { margin-bottom:4px; }
    .a ::ng-deep ol { padding-left:18px; }
    .footer-cta { text-align:center; max-width:800px; margin:0 auto; }
    .footer-cta p { color:#888; font-size:0.9rem; margin-bottom:16px; }
  `]
})
export class FaqComponent {
  open: number | null = null;
  faqs = [
    {q:'¿Dónde quedan exactamente los lotes?', a:'Quedan sobre Ruta Nacional 4, a 5 km de Bonpland y 15 km de Leandro N. Alem (por la escuela Almafuerte, ex Escuela 629).<br><br><strong>Ubicación exacta:</strong> <a href="https://maps.app.goo.gl/wkT1nT3xwwUx5bVa8" target="_blank" style="color:#2ecc71">Ver en Google Maps</a><br><br>Acceso directo por ruta asfaltada y también por calle interna.'},
    {q:'¿Qué servicios tienen?', a:'<ul><li><strong>Agua:</strong> red vecinal de pozo.</li><li><strong>Luz:</strong> línea en ruta.</li><li><strong>Internet:</strong> excelente servicio con Starlink.</li><li><strong>Calles:</strong> mantenimiento de los caminos internos y la banquina.</li></ul>'},
    {q:'¿Tienen título individual listo para escriturar?', a:'Sí, todos tienen título individual y están listos para transferir. Somos titulares directos con mi esposa.'},
    {q:'¿Cómo es el proceso de compra?', a:'<ol style="padding-left:18px"><li style="margin-bottom:8px"><strong>Reserva con seña del 20%</strong> que será descontada del total. Por transferencia o en efectivo en la escribanía, y se firma la documentación de reserva.</li><li style="margin-bottom:8px">La escribanía solicita los certificados correspondientes (dominio e inhibiciones en Rentas).</li><li>Se escritura tras salida de certificados (generalmente 15-20 días).</li></ol><br><strong>Gastos incluidos:</strong> 50% del Impuesto de Sellos.'},
    {q:'¿Qué formas de pago aceptan?', a:'<strong>Contado</strong> en cualquier moneda: pesos argentinos, dólares, guaraníes, reales, USDT, Bitcoin, etc.<br><br><strong>Financiación en UVA</strong> (Unidad de Valor Adquisitivo) hasta 24 cuotas.'},
    {q:'¿Es tranquilo y seguro el lugar?', a:'Súper tranquilo y seguro. Es una zona rural muy familiar, hay varias casas alrededor, escuela enfrente, vecinos permanentes.'},
  ];
}
