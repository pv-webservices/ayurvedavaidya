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

## Launch notes

- The consultation form posts to [FormSubmit](https://formsubmit.co) (`FORM_ENDPOINT` in `src/data.js`), which emails each enquiry to ayurvedavaidya6@gmail.com. The first submission sends an activation email to that inbox — click **Activate Form** once, and every later enquiry is delivered.
- Testimonials are carried over from the previous design; replace them with consented, verified patient content before launch.
- Confirm consent from the patients shown in the clinic gallery (`public/images/v2/clinic-visit-*.webp`).
- Supply professionally reviewed Privacy Policy, Terms and Medical/Wellness Disclaimer copy.

Service imagery in `public/images/v2/svc-*.webp`, `hero-clinic.webp` and `cta-botanical.webp` was generated with Google Nano Banana 2 (Magnific, 1K) and optimized to WebP. Doctor and clinic photographs are real photos supplied by the client. No video assets are used.
