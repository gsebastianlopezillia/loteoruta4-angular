import { Injectable, inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private zone = inject(NgZone);

  private send(name: string, params?: Record<string, string | number | boolean>) {
    this.zone.runOutsideAngular(() => {
      if (typeof window === 'undefined' || !window.gtag) return;
      window.gtag('event', name, params ?? {});
    });
  }

  trackWhatsAppClick(ctaLocation: string) {
    this.send('whatsapp_click', { cta_location: ctaLocation });
    window.fbq?.('track', 'Contact');
  }

  trackCalculadoraLink(loteNum: number, precioUsd: number) {
    this.send('calculadora_link', { lote_num: loteNum, precio_usd: precioUsd });
  }

  trackCalculadoraSimulate(loteNum: number, precioUsd: number, plazoMeses: number) {
    this.send('calculadora_simulate', { lote_num: loteNum, precio_usd: precioUsd, plazo_meses: plazoMeses });
  }

  trackScrollDepth(percent: number) {
    this.send('scroll_depth', { percent, page: '/' });
  }
}
