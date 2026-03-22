import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="banner">
      <p class="offer-text">🌞 OFERTA VERANO: con el lote te entregamos un tanque tricapa de 600lts 🌞</p>
      <div class="countdown">
        <div class="unit"><span class="num">{{pad(days)}}</span><span class="label">Días</span></div>
        <span class="sep">:</span>
        <div class="unit"><span class="num">{{pad(hours)}}</span><span class="label">Horas</span></div>
        <span class="sep">:</span>
        <div class="unit"><span class="num">{{pad(minutes)}}</span><span class="label">Min</span></div>
        <span class="sep">:</span>
        <div class="unit"><span class="num">{{pad(seconds)}}</span><span class="label">Seg</span></div>
      </div>
    </div>
  `,
  styles: [`
    .banner { background:#1a5c33; padding:10px 20px 14px; text-align:center; margin-top:64px; }
    .offer-text { font-family:'Montserrat',sans-serif; font-size:0.88rem; font-weight:600; color:#fff; margin-bottom:10px; }
    .countdown { display:inline-flex; align-items:center; gap:6px; }
    .unit { display:flex; flex-direction:column; align-items:center; }
    .num { background:#0f3d22; border-radius:6px; font-family:'Montserrat',sans-serif; font-size:1.3rem; font-weight:800; color:#fff; padding:4px 12px; min-width:52px; text-align:center; }
    .label { font-size:0.65rem; color:rgba(255,255,255,0.7); text-transform:uppercase; margin-top:3px; }
    .sep { font-size:1.4rem; font-weight:700; color:#fff; margin-bottom:14px; }
  `]
})
export class BannerComponent implements OnInit, OnDestroy {
  days=0; hours=0; minutes=0; seconds=0;
  private interval: any;
  private target = new Date(Date.now() + 10*24*60*60*1000);
  ngOnInit() { this.tick(); this.interval = setInterval(()=>this.tick(), 1000); }
  ngOnDestroy() { clearInterval(this.interval); }
  tick() {
    const d = this.target.getTime() - Date.now();
    if(d<=0){this.days=this.hours=this.minutes=this.seconds=0;return;}
    this.days=Math.floor(d/(864e5)); this.hours=Math.floor((d%864e5)/36e5);
    this.minutes=Math.floor((d%36e5)/6e4); this.seconds=Math.floor((d%6e4)/1000);
  }
  pad(n:number){ return n.toString().padStart(2,'0'); }
}
