# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for Celestra, a premium RSS reader for iOS. Built with Astro static site generator and deployed on Netlify.

**Domain**: celestr.app
**Stack**: Astro + Netlify Forms + Netlify Hosting
**Purpose**: Single-page marketing site with TestFlight signup

## Development Commands

```bash
# Development
npm run dev              # Start dev server at localhost:4321
npm run build           # Build for production (includes type checking)
npm run preview         # Preview production build locally

# Testing
npm run lighthouse      # Run Lighthouse performance testing locally

# Netlify-specific
netlify dev             # Run with Netlify functions/forms locally
netlify deploy          # Deploy draft
netlify deploy --prod   # Deploy to production
```

## Architecture

### Netlify Forms

TestFlight signup uses Netlify Forms with server-side and client-side handling. Key patterns:

1. Forms require `data-netlify="true"` attribute
2. Include hidden field: `<input type="hidden" name="form-name" value="testflight-signup" />`
3. Honeypot spam protection: `netlify-honeypot="bot-field"` with hidden `bot-field` input
4. Form submissions viewable in Netlify dashboard under Forms section
5. Client-side validation via `public/scripts/form-validation.js` (progressive enhancement)
6. Loading states with spinner during submission

To test forms locally: use `netlify dev` (not `npm run dev`) to enable Netlify's form processing.

### Security

The site implements strict security measures:

1. **Content Security Policy (CSP):** No inline scripts allowed - all JavaScript in external files
2. **Email Obfuscation:** Uses `ObfuscatedEmail.astro` component with base64 encoding
   - JavaScript decodes emails client-side via `public/scripts/email-obfuscation.js`
   - Fallback to standard mailto links if JavaScript is disabled
3. **Environment Variables:** All email addresses configured via environment variables
   - `BETA_EMAIL` - TestFlight notifications
   - `PRIVACY_EMAIL` - Privacy inquiries
   - `SUPPORT_EMAIL` - Support inquiries
4. **Security Headers:** Configured in `public/_headers` (CSP, HSTS, X-Frame-Options, etc.)

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push and PR:

1. **Build & Test Job:**
   - TypeScript type checking with `astro check`
   - Production build verification
   - Uploads build artifacts

2. **Link Check Job:**
   - Validates all internal links
   - Prevents broken links in production

3. **Lighthouse Job:**
   - Performance audits
   - Accessibility testing (100% required)
   - SEO and best practices checks
   - Configuration in `.lighthouserc.json`

### Page Structure

- `src/pages/index.astro` - Single-page site with hero, features, and signup sections
- `src/pages/privacy.astro` - Privacy Policy with Plausible Analytics disclosure
- `src/pages/terms.astro` - Terms of Service
- `src/pages/thank-you.astro` - Post-signup confirmation page
- `src/layouts/Layout.astro` - Base layout with Header/Footer, loads external scripts
- `src/components/` - Reusable Astro components
  - `Header.astro` - Centered logo (no navigation links)
  - `Footer.astro` - Footer with improved link styling
  - `TestFlightForm.astro` - Signup form with validation styles
  - `ObfuscatedEmail.astro` - Email obfuscation component
- Homepage includes the TestFlight signup form directly on the page with a `#signup` anchor

The site uses scoped CSS in `.astro` files. Components are self-contained with inline styles.

Client-side JavaScript is in `public/scripts/`:
- `form-validation.js` - Email validation and loading states
- `email-obfuscation.js` - Base64 email decoding

Additional pages exist for potential future use (`about.astro`, `releases/`) but are not currently linked from the main navigation.

## Deployment

Site builds to `dist/` directory. Netlify configuration in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

The `astro.config.mjs` sets `site: 'https://celestr.app'` for sitemap/SEO generation.

## Key Conventions

- **TypeScript**: Project uses strict TypeScript mode with `astro check` in build process
- **Styling**: Scoped CSS within `.astro` files (no Tailwind)
- **JavaScript**: All client-side JavaScript in external files (CSP requirement - no inline scripts)
- **Progressive Enhancement**: All features work without JavaScript (forms, emails, navigation)
- **Security-First**: Strict CSP, email obfuscation, environment variables for sensitive data
- **Design language**: App emphasizes beautiful, native iOS design without specific version references
- **Timeline**: Generic timeline messaging without specific dates
- **Forms**: Only one form - TestFlight waitlist signup (appears on homepage with `#signup` anchor)
- **Site structure**: Currently a single-page site. Additional pages exist but are not linked (can be added later)
- **Testing**: CI/CD pipeline validates TypeScript, builds, performance, accessibility, and links

## Project Context

This is a pre-launch marketing site for an unreleased iOS app. Content emphasizes:
- Beautiful, native iOS design
- Premium/elegant positioning
- TestFlight beta program
- Generic launch timeline
