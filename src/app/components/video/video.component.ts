import { Component } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  template: `
    <section id="video" class="section video-section">
      <div class="container">
        <h2 class="section-title">Conocé el lote en <span class="green">video</span></h2>
        <p class="section-subtitle">Recorrido real por el terreno y su entorno</p>
        <div class="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/Gpv1sWGmM-E"
            title="Loteo Ruta 4 - Recorrido del terreno"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .video-section { background:#000; }
    .video-wrapper {
      position:relative; padding-bottom:56.25%; height:0; overflow:hidden;
      border-radius:16px; border:1px solid #222;
    }
    .video-wrapper iframe {
      position:absolute; top:0; left:0; width:100%; height:100%;
    }
  `]
})
export class VideoComponent {}
