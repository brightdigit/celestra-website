# Celestra Website

Marketing website for Celestra, a premium RSS reader for iOS.

## Tech Stack

- **Framework:** Astro 4.16.18 (Static Site Generator)
- **Styling:** Scoped CSS (no Tailwind)
- **Hosting:** Netlify
- **Forms:** Netlify Forms with honeypot spam protection
- **Analytics:** Plausible (privacy-friendly)

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
```

## Deployment

Deploys automatically to Netlify on push to `main` branch.

### Environment Variables (Netlify Dashboard)

Set these in Netlify Dashboard → Site settings → Environment variables:

- `BETA_EMAIL` - Email for TestFlight signup notifications (e.g., `beta@celestr.app`)

### Optional Environment Variables

- `PUBLIC_PLAUSIBLE_DOMAIN` - Override default Plausible analytics domain (default: `celestr.app`)

## Project Structure

```
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── TestFlightForm.astro
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
│   └── _headers          # Security headers
├── netlify.toml          # Netlify configuration
├── astro.config.mjs      # Astro configuration
└── CLAUDE.md             # AI assistant guidance
```

## Features

- **TestFlight Signup Form:** Netlify Forms integration with spam protection
- **Security Headers:** Content Security Policy and other security headers via `_headers` file
- **SEO Optimized:** Sitemap generation, robots.txt, Open Graph tags
- **Accessibility:** ARIA labels, SVG titles, semantic HTML
- **Responsive Design:** Mobile-first approach with scoped CSS

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development guidelines and project conventions.

## License

MIT License - see [LICENSE](./LICENSE) file for details.
