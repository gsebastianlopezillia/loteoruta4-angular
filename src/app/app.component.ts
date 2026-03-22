import { Component, inject, HostListener } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { GarantiasComponent } from './components/garantias/garantias.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { LotesComponent } from './components/lotes/lotes.component';
import { FeaturesComponent } from './components/features/features.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FaqComponent } from './components/faq/faq.component';
import { VideoComponent } from './components/video/video.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappBtnComponent } from './components/whatsapp-btn/whatsapp-btn.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent, HeroComponent,
    // GarantiasComponent,
    UbicacionComponent, LotesComponent,
    FeaturesComponent, GaleriaComponent, ReviewsComponent,
    FaqComponent, VideoComponent, FooterComponent, WhatsappBtnComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-lotes></app-lotes>
    <app-ubicacion></app-ubicacion>
    <app-galeria></app-galeria>
    <app-video></app-video>
    <app-faq></app-faq>
    <app-features></app-features>
    <app-reviews></app-reviews>
    <app-footer></app-footer>
    <app-whatsapp-btn></app-whatsapp-btn>
  `
})
export class AppComponent {
  private analytics = inject(AnalyticsService);
  private fired = new Set<number>();

  @HostListener('window:scroll')
  onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((window.scrollY / docHeight) * 100);
    for (const t of [25, 50, 75, 100]) {
      if (pct >= t && !this.fired.has(t)) {
        this.fired.add(t);
        this.analytics.trackScrollDepth(t);
      }
    }
  }
}
