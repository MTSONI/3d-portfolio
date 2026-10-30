# Deployment Guide

This 3D portfolio starter is 100% self-contained and statically compiled. It requires no database, no authentication backend, and zero environment variables to deploy.

---

## 1. Zero-Config Deployment Options

### Vercel
1. Push your repository to GitHub.
2. In the Vercel dashboard, click **Add New Project** and select your repository.
3. Framework preset: **Next.js** (detected automatically).
4. Click **Deploy**.

### Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Click **Deploy Site**.

### Cloudflare Pages / Static Hosting
1. Build command: `npm run build`
2. Output directory: `.next`

---

## 2. Optional Environment Variables

If you configure a custom domain or Google Search Console verification:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g. `https://yourdomain.com`). Drives canonical links, sitemap, and Open Graph metadata. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional verification token for Google Search Console. |

---

## 3. Contact Form Integration (Optional)

The starter includes a clean, client-side contact submission flow. To forward messages to your inbox in production, you can easily wire any serverless form provider into `hooks/use-contact-form.ts`:

- **Formspree:** POST form data to `https://formspree.io/f/{form_id}`.
- **Resend:** Send via a simple Next.js route or serverless function.
- **EmailJS:** Call `emailjs.send(...)` client-side.
- **Web3Forms / Getform:** POST data to their access-key endpoint.
