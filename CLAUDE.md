# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for Celestra, a premium RSS reader for iOS 26. Built with Astro static site generator and deployed on Netlify.

**Domain**: celestr.app
**Stack**: Astro + Netlify Forms + Netlify Hosting
**Purpose**: Marketing site with TestFlight signup and release notes

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

### Content Collections

Release notes are managed via Astro's Content Collections API in `src/content/releases/`. Each release is a markdown file with frontmatter:

```typescript
// Schema defined in src/content/config.ts
{
  version: string,      // e.g., "0.1.0"
  date: Date,
  title: string,
  description?: string,
  featured: boolean     // default false
}
```

Dynamic routes:
- `/releases/` - Lists all releases, sorted by date descending
- `/releases/[slug]` - Individual release note pages with full markdown rendering

### Netlify Forms

TestFlight signup uses Netlify Forms with server-side handling. Key patterns:

1. Forms require `data-netlify="true"` attribute
2. Include hidden field: `<input type="hidden" name="form-name" value="testflight-signup" />`
3. Honeypot spam protection: `netlify-honeypot="bot-field"` with hidden `bot-field` input
4. Form submissions viewable in Netlify dashboard under Forms section

To test forms locally: use `netlify dev` (not `npm run dev`) to enable Netlify's form processing.

### Page Structure

- `src/pages/` - File-based routing (index, about, testflight, releases)
- `src/layouts/Layout.astro` - Base layout with Header/Footer slots
- `src/components/` - Reusable Astro components (Header, Footer, TestFlightForm)

The site uses scoped CSS in `.astro` files. Components are self-contained with inline styles.

## Deployment

Site builds to `dist/` directory. Netlify configuration in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20

The `astro.config.mjs` sets `site: 'https://celestr.app'` for sitemap/SEO generation.

## Content Management

### Adding Release Notes

1. Create `src/content/releases/vX.Y.Z.md`
2. Add frontmatter with version, date, title, description, featured flag
3. Write markdown content below frontmatter
4. Deploy - new release automatically appears on `/releases`

The release listing page (`src/pages/releases/index.astro`) uses `getCollection('releases')` and sorts by date. Individual pages use `getStaticPaths()` for pre-rendering at build time.

## Key Conventions

- **TypeScript**: Project uses strict TypeScript mode
- **Styling**: Scoped CSS within `.astro` files, not Tailwind (though setup guide mentions it as optional)
- **iOS 26 context**: App targets iOS 26 Beta with "Liquid Glass" design language
- **Beta timeline**: TestFlight expected August 2025, public release September 2025
- **Forms**: Only one form currently - TestFlight waitlist signup

## Project Context

This is a pre-launch marketing site for an unreleased iOS app. Content emphasizes:
- iOS 26 Liquid Glass design system
- Premium/elegant positioning
- TestFlight beta program for iOS 26 users
- Fall 2025 launch timeline
