import { Component } from '@angular/core';

@Component({
  selector: 'app-modelo3d',
  standalone: true,
  template: `
    <section id="modelo3d" class="section modelo3d-section">
      <div class="container">
        <h2 class="section-title">Conoce tu próxima <span class="green">tierra en 3D</span></h2>
        <div class="modelo-wrapper">
          <iframe title="lotedetail_Model_4" frameborder="0" 
                  allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" 
                  allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking 
                  execution-while-out-of-viewport execution-while-not-rendered web-share 
                  src="https://sketchfab.com/models/f66772ed2d324eabaaa9e1af5d651fa0/embed"> </iframe>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .modelo3d-section { background: #000; }
    .modelo-wrapper {
      position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;
      border-radius: 16px; border: 1px solid #222;
    }
    .modelo-wrapper iframe {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    }
    .modelo-credit {
      font-size: 13px; font-weight: normal; margin: 10px 0 0; color: #4A4A4A; text-align: center;
    }
    .modelo-credit a {
      font-weight: bold; color: #1CAAD9; text-decoration: none;
    }
    .modelo-credit a:hover { text-decoration: underline; }
  `]
})
export class Modelo3dComponent { }
