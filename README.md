# Gatwech Kuol Nyoak Portfolio

Professional portfolio for Gatwech Kuol Nyoak, Accounting & Finance Professional.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173/`.

## Vercel deployment

Import this repository into Vercel. The included `vercel.json` uses the existing Vite build:

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

Add these environment variables in Vercel when the contact form is ready:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Optionally add `VITE_SITE_URL` with the final HTTPS deployment URL. Do not commit `.env` or private credentials.