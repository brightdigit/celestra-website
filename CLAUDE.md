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
npm run build           # Build for production
npm run preview         # Preview production build locally

# Netlify-specific
netlify dev             # Run with Netlify functions/forms locally
netlify deploy          # Deploy draft
netlify deploy --prod   # Deploy to production
```

## Architecture

### Netlify Forms

TestFlight signup uses Netlify Forms with server-side handling. Key patterns:

1. Forms require `data-netlify="true"` attribute
2. Include hidden field: `<input type="hidden" name="form-name" value="testflight-signup" />`
3. Honeypot spam protection: `netlify-honeypot="bot-field"` with hidden `bot-field` input
4. Form submissions viewable in Netlify dashboard under Forms section

To test forms locally: use `netlify dev` (not `npm run dev`) to enable Netlify's form processing.

### Page Structure

- `src/pages/index.astro` - Single-page site with hero, features, and signup sections
- `src/pages/privacy.astro` - Privacy Policy (linked from signup form)
- `src/pages/terms.astro` - Terms of Service (linked from signup form)
- `src/layouts/Layout.astro` - Base layout with Header/Footer slots
- `src/components/` - Reusable Astro components (Header, Footer, TestFlightForm)
- Homepage includes the TestFlight signup form directly on the page with a `#signup` anchor
- Header is simplified with just the centered logo (no navigation links)

The site uses scoped CSS in `.astro` files. Components are self-contained with inline styles.

Additional pages exist for potential future use (`about.astro`, `releases/`) but are not currently linked from the main navigation.

## Deployment

Site builds to `dist/` directory. Netlify configuration in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

The `astro.config.mjs` sets `site: 'https://celestr.app'` for sitemap/SEO generation.

## Key Conventions

- **TypeScript**: Project uses strict TypeScript mode
- **Styling**: Scoped CSS within `.astro` files, not Tailwind (though setup guide mentions it as optional)
- **Design language**: App emphasizes beautiful, native iOS design without specific version references
- **Timeline**: Generic timeline messaging without specific dates
- **Forms**: Only one form - TestFlight waitlist signup (appears on homepage with `#signup` anchor)
- **Site structure**: Currently a single-page site. Additional pages exist but are not linked (can be added later)

## Project Context

This is a pre-launch marketing site for an unreleased iOS app. Content emphasizes:
- Beautiful, native iOS design
- Premium/elegant positioning
- TestFlight beta program
- Generic launch timeline
