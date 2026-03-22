# Loteo Ruta 4 — Clon Angular 17

Clon fiel del sitio [loteoruta4.com](https://loteoruta4.com) construido con **Angular 17 standalone components**.

## Instalación y uso

```bash
npm install
npm start          # http://localhost:4200
npm run build      # dist/loteo-ruta4/
```

## Estructura

| Componente | Descripción |
|---|---|
| `navbar` | Navbar fija, scroll spy, menú mobile |
| `banner` | Oferta verano + countdown en tiempo real |
| `hero` | Hero fullscreen con imagen de fondo |
| `garantias` | Listado de garantías absolutas |
| `ubicacion` | Google Maps embed + cards de ubicación |
| `lotes` | Grid de lotes disponibles + simulador de cuotas |
| `features` | 6 características del proyecto |
| `galeria` | Slider de imágenes con thumbnails |
| `reviews` | Carrusel de testimonios |
| `faq` | Acordeón de preguntas frecuentes |
| `footer` | Footer con contacto y oferta |
| `whatsapp-btn` | Botón flotante de WhatsApp |

## Personalización rápida

- **WhatsApp:** buscar `5437641653757` en todos los `.ts`
- **Precios:** `lotes.component.ts` → array `lotes`
- **Imágenes:** `galeria.component.ts` → array `slides` (reemplazar Unsplash por tus fotos reales)
- **Colores:** `src/styles/global.scss` → variables `:root`
- **Countdown:** `banner.component.ts` → variable `target`
