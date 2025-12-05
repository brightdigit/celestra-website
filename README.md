# Celestra Website

Marketing website for Celestra, a premium RSS reader for iOS.

## Tech Stack

- **Framework:** Astro 5.16.4 (Static Site Generator)
- **Styling:** Scoped CSS (no Tailwind)
- **Hosting:** Netlify
- **Forms:** Netlify Forms with honeypot spam protection + client-side validation
- **Analytics:** Plausible (privacy-friendly)
- **CI/CD:** GitHub Actions (type checking, builds, Lighthouse CI, link checking)

## Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Test with Netlify features (Forms, etc.)
netlify dev

# Run Lighthouse performance testing locally
npm run lighthouse
```

## Deployment

Deploys automatically to Netlify on push to `main` branch.

### Environment Variables

Set these in Netlify Dashboard → Site settings → Environment variables:

- `BETA_EMAIL` - Email for TestFlight signup notifications (e.g., `beta@celestr.app`)
- `PRIVACY_EMAIL` - Email for privacy-related inquiries (e.g., `privacy@celestr.app`)
- `SUPPORT_EMAIL` - Email for support inquiries (e.g., `support@celestr.app`)
- `PUBLIC_PLAUSIBLE_DOMAIN` - Plausible analytics domain (default: `celestr.app`)

See `.env.example` for all available environment variables.

## Project Structure

```
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── TestFlightForm.astro
│   │   └── ObfuscatedEmail.astro
│   ├── layouts/          # Page layouts
│   │   └── Layout.astro
│   ├── pages/            # Routes (file-based routing)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── thank-you.astro
│   │   └── 404.astro
│   └── content/          # Content collections
│       └── releases/     # Release notes
├── public/               # Static assets
│   ├── favicon.svg
│   ├── Celestra-Logo.svg
│   ├── robots.txt
│   ├── _headers          # Security headers (CSP, HSTS, etc.)
│   └── scripts/          # Client-side JavaScript
│       ├── form-validation.js
│       └── email-obfuscation.js
├── .github/
│   └── workflows/
│       └── ci.yml        # CI/CD pipeline
├── netlify.toml          # Netlify configuration
├── astro.config.mjs      # Astro configuration
├── .lighthouserc.json    # Lighthouse CI configuration
├── .env.example          # Environment variables template
└── CLAUDE.md             # AI assistant guidance
```

## Features

### Security
- **Content Security Policy (CSP):** Strict CSP with no inline scripts
- **Email Obfuscation:** Base64-encoded emails to prevent bot harvesting
- **Security Headers:** CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Honeypot Spam Protection:** Bot detection on form submissions

### User Experience
- **Client-Side Form Validation:** Real-time email validation with visual feedback
- **Loading States:** Spinner and disabled state during form submission
- **Progressive Enhancement:** All features work without JavaScript (graceful degradation)
- **Responsive Design:** Mobile-first approach with scoped CSS

### Performance & Quality
- **CI/CD Pipeline:** Automated testing with GitHub Actions
  - TypeScript type checking
  - Build verification
  - Lighthouse CI (performance, accessibility, SEO, best practices)
  - Broken link detection
- **SEO Optimized:** Sitemap generation, robots.txt, Open Graph tags
- **Accessibility:** ARIA labels, SVG accessibility attributes, semantic HTML
- **Analytics:** Privacy-friendly Plausible Analytics with GDPR/CCPA compliance

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development guidelines and project conventions.

## License

MIT License - see [LICENSE](./LICENSE) file for details.
