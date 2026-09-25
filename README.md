# AyurvedaVaidya frontend

Production-oriented React/Vite frontend for AyurvedaVaidya.com.

## Run locally

```bash
npm install
npm run dev
```

Create an optimized production build with `npm run build`.

## Structure

- `src/i18n/` — English, Spanish and Russian dictionaries (`en.js`, `es.js`, `ru.js`) and the `LanguageProvider`. The chosen language is remembered in `localStorage`.
- `src/data.js` — contact details, image paths and other language-independent data.
- `src/HomePage.jsx`, `src/pages/` — routes; `src/components/` — header, footer, gallery, programs, CTA.
- `src/motion.jsx` — scroll-progress hook (writes `--p` CSS variables), reveal, counter and card tilt helpers.
- `src/styles/` — `base.css` (tokens, buttons, motion), `layout.css`, `home.css`, `pages.css`.

## SEO & deployment

- `src/seo.js` is the single source of per-route titles, descriptions, canonicals, robots, social tags and JSON-LD. Add new public routes there as well as in `src/App.jsx`. Page URLs end in a slash (`/about/`).
- `npm run build` runs `scripts/prerender.mjs` after Vite. It writes every route as a real folder (`dist/about/index.html`), so any static host serves it without rewrite rules, plus redirect pages for `/contact` and `/ayurveda`, `404.html`, `sitemap.xml`, `robots.txt` and an optional `.htaccess` (www/HTTPS 301s and the branded 404 page when the host keeps it). The build fails if any of these are missing.
- **Hostinger (Node.js Web App → upload ZIP):** upload the project source without `node_modules`, `dist` and `output`. Hostinger runs `npm install` and `npm run build` and publishes `dist/`. Framework: Vite · Build command: `npm run build` · Output directory: `dist` · Node.js 20, 22 or 24.
- Dependencies are pinned to exact versions; Vite 8 needs Node `^20.19.0 || >=22.12.0` (see `engines`).

## Launch notes

- The consultation form posts to [FormSubmit](https://formsubmit.co) (`FORM_ENDPOINT` in `src/data.js`), which emails each enquiry to ayurvedavaidya6@gmail.com. The first submission sends an activation email to that inbox — click **Activate Form** once, and every later enquiry is delivered.
- Testimonials are carried over from the previous design; replace them with consented, verified patient content before launch.
- Confirm consent from the patients shown in the clinic gallery (`public/images/v2/clinic-visit-*.webp`).
- Privacy Policy, Terms of Use and Medical & Wellness Disclaimer copy lives in `src/i18n/en.js` (`legal.pages`); have it reviewed by a legal professional, and update `legal.updated` whenever it changes.

Service imagery in `public/images/v2/svc-*.webp`, `hero-clinic.webp` and `cta-botanical.webp` was generated with Google Nano Banana 2 (Magnific, 1K) and optimized to WebP. Doctor and clinic photographs are real photos supplied by the client. No video assets are used.
