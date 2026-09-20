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

Important: `.env` is intentionally excluded from GitHub. GitHub does not sync environment variables to Vercel. Add these variables directly in Vercel under **Project Settings > Environment Variables**, enable them for **Production**, then redeploy. If they are missing, the form opens a prepared email in the visitor's default email app instead.

After adding or changing environment variables, trigger a new deployment. Vite embeds `VITE_` variables during the build, so an old deployment cannot receive newly added values without rebuilding.

Optionally add `VITE_SITE_URL` with the final HTTPS deployment URL. Do not commit `.env` or private credentials.