# Sairaghav Udayagiri — Portfolio

Next.js 16 App Router · TypeScript · Tailwind CSS · ESLint

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Before deploying

| Item | Action |
|---|---|
| `public/resume.pdf` | Replace placeholder with the real résumé |
| EmailJS keys | Copy `.env.local.example` → `.env.local`, fill in values |
| `public/favicon.ico` | Add a proper 32×32 ICO |
| `public/apple-touch-icon.png` | Add 180×180 PNG |
| `public/icon-192.png` / `icon-512.png` | Add PWA icons |

## Env vars

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

## Deploy (Vercel — recommended)

```bash
vercel --prod
```

Set env vars in the Vercel dashboard. The OG image auto-generates from `src/app/opengraph-image.tsx`.
