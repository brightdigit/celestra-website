# Celestra Website Setup Guide

**Domain**: celestr.app (recommended)
**Stack**: Astro + Netlify Forms + Netlify Hosting
**Purpose**: Marketing site with TestFlight signup and release notes

---

## Quick Start Commands

```bash
# Create new project
npm create astro@latest celestra-website -- --template minimal --no-install --no-git --typescript strict

cd celestra-website

# Install dependencies
npm install

# Add Tailwind CSS (optional but recommended for styling)
npx astro add tailwind

# Start dev server
npm run dev
```

---

## Project Structure

```
celestra-website/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Home page
│   │   ├── about.astro           # About page
│   │   ├── pricing.astro         # Pricing page (optional)
│   │   ├── testflight.astro      # TestFlight signup page
│   │   └── releases/
│   │       ├── index.astro       # Release notes listing
│   │       └── [slug].astro      # Individual release note
│   ├── content/
│   │   ├── config.ts             # Content collections config
│   │   └── releases/
│   │       ├── v0.1.0.md         # Example release note
│   │       └── v0.2.0.md
│   ├── layouts/
│   │   └── Layout.astro          # Base layout
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── TestFlightForm.astro
│   └── styles/
│       └── global.css
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## File Contents

### `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const releases = defineCollection({
  type: 'content',
  schema: z.object({
    version: z.string(),
    date: z.date(),
    title: z.string(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { releases };
```

### `src/layouts/Layout.astro`

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = "Celestra - Premium RSS reader for iOS 26" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style is:global>
  :root {
    --accent: 136, 58, 234;
    --accent-light: 224, 204, 250;
    --accent-dark: 49, 10, 101;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-family: system-ui, sans-serif;
    background: #ffffff;
  }

  body {
    margin: 0;
  }

  main {
    min-height: 80vh;
  }
</style>
```

### `src/components/Header.astro`

```astro
---
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/releases', label: 'Release Notes' },
  { href: '/testflight', label: 'Join Beta' },
];
---

<header>
  <nav>
    <a href="/" class="logo">
      <span>Celestra</span>
    </a>
    <ul>
      {navItems.map(item => (
        <li>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  </nav>
</header>

<style>
  header {
    padding: 1rem 2rem;
    border-bottom: 1px solid #e5e7eb;
  }

  nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: #111;
  }

  ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #374151;
    transition: color 0.2s;
  }

  a:hover {
    color: #111;
  }
</style>
```

### `src/components/Footer.astro`

```astro
<footer>
  <div class="container">
    <p>&copy; {new Date().getFullYear()} Celestra. All rights reserved.</p>
    <div class="links">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </div>
  </div>
</footer>

<style>
  footer {
    padding: 3rem 2rem;
    border-top: 1px solid #e5e7eb;
    margin-top: 4rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .links {
    display: flex;
    gap: 2rem;
  }

  a {
    color: #6b7280;
    text-decoration: none;
  }

  a:hover {
    color: #111;
  }

  p {
    margin: 0;
    color: #6b7280;
  }

  @media (max-width: 640px) {
    .container {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
</style>
```

### `src/components/TestFlightForm.astro`

```astro
---
// This form uses Netlify Forms for server-side handling
---

<div class="form-container">
  <form
    name="testflight-signup"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="testflight-signup" />

    <!-- Honeypot field for spam prevention -->
    <p hidden>
      <label>
        Don't fill this out if you're human: <input name="bot-field" />
      </label>
    </p>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="you@example.com"
      />
    </div>

    <div class="form-group">
      <label for="name">Name (Optional)</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your name"
      />
    </div>

    <div class="form-group checkbox">
      <input
        type="checkbox"
        id="ios26"
        name="ios26"
        value="yes"
      />
      <label for="ios26">I'm running iOS 26 Beta</label>
    </div>

    <button type="submit">Join TestFlight Waitlist</button>

    <p class="privacy-note">
      We'll only use your email to send TestFlight invitations.
      No spam, ever. See our <a href="/privacy">privacy policy</a>.
    </p>
  </form>
</div>

<style>
  .form-container {
    max-width: 500px;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group.checkbox {
    flex-direction: row;
    align-items: center;
  }

  .form-group.checkbox input {
    width: auto;
    margin-right: 0.5rem;
  }

  label {
    font-weight: 500;
    color: #374151;
  }

  input[type="email"],
  input[type="text"] {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input[type="email"]:focus,
  input[type="text"]:focus {
    outline: none;
    border-color: #6366f1;
  }

  button {
    padding: 0.875rem 1.5rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #4f46e5;
  }

  .privacy-note {
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
    margin: 0;
  }

  .privacy-note a {
    color: #6366f1;
    text-decoration: none;
  }

  .privacy-note a:hover {
    text-decoration: underline;
  }
</style>
```

### `src/pages/index.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Celestra - Premium RSS Reader for iOS 26">
  <section class="hero">
    <div class="container">
      <h1>Your RSS Feeds, Beautifully Reimagined</h1>
      <p class="tagline">
        Experience the future of RSS reading with iOS 26's Liquid Glass design.
        Premium, elegant, and built for those who value exceptional design.
      </p>
      <div class="cta">
        <a href="/testflight" class="button primary">Join TestFlight Beta</a>
        <a href="/about" class="button secondary">Learn More</a>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <h2>Designed for iOS 26</h2>
      <div class="feature-grid">
        <div class="feature">
          <h3>Liquid Glass Design</h3>
          <p>Immersive translucent interfaces that feel native to iOS 26.</p>
        </div>
        <div class="feature">
          <h3>Offline First</h3>
          <p>Read anywhere with intelligent caching and iCloud sync.</p>
        </div>
        <div class="feature">
          <h3>Premium Experience</h3>
          <p>No ads, no tracking. Just pure reading bliss.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <h2>Be the First to Experience Celestra</h2>
      <p>Join our TestFlight beta and help shape the future of RSS reading.</p>
      <a href="/testflight" class="button primary">Sign Up Now</a>
    </div>
  </section>
</Layout>

<style>
  .hero {
    padding: 6rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
    font-weight: 700;
  }

  .tagline {
    font-size: 1.25rem;
    margin: 0 0 2rem 0;
    opacity: 0.95;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .button {
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s, opacity 0.2s;
  }

  .button:hover {
    transform: translateY(-2px);
  }

  .button.primary {
    background: white;
    color: #667eea;
  }

  .button.secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .features {
    padding: 6rem 2rem;
  }

  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .feature {
    text-align: center;
  }

  .feature h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .feature p {
    color: #6b7280;
    line-height: 1.6;
  }

  .cta-section {
    padding: 6rem 2rem;
    background: #f9fafb;
    text-align: center;
  }

  .cta-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .cta-section p {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .tagline {
      font-size: 1rem;
    }

    .features h2,
    .cta-section h2 {
      font-size: 2rem;
    }
  }
</style>
```

### `src/pages/testflight.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import TestFlightForm from '../components/TestFlightForm.astro';
---

<Layout
  title="Join TestFlight - Celestra"
  description="Sign up for Celestra's TestFlight beta and be among the first to experience iOS 26's most elegant RSS reader."
>
  <section class="testflight-page">
    <div class="container">
      <h1>Join the Celestra TestFlight Beta</h1>
      <p class="intro">
        Be among the first to experience the future of RSS reading.
        We're looking for design-conscious users running iOS 26 Beta to help
        us refine Celestra before our official launch in Fall 2025.
      </p>

      <div class="requirements">
        <h2>Requirements</h2>
        <ul>
          <li>iOS 26 Beta installed (preferred but not required)</li>
          <li>Apple ID for TestFlight</li>
          <li>Willingness to provide feedback</li>
        </ul>
      </div>

      <TestFlightForm />

      <div class="faq">
        <h2>What to Expect</h2>
        <dl>
          <dt>When will I receive an invite?</dt>
          <dd>We'll send TestFlight invitations in waves as we reach development milestones. Expected first beta: August 2025.</dd>

          <dt>How long is the beta period?</dt>
          <dd>The beta will run from August through iOS 26's public release in September 2025.</dd>

          <dt>Will my data be saved?</dt>
          <dd>Yes! Your feeds and preferences will sync via iCloud and carry over to the production release.</dd>
        </dl>
      </div>
    </div>
  </section>
</Layout>

<style>
  .testflight-page {
    padding: 4rem 2rem;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .intro {
    font-size: 1.125rem;
    text-align: center;
    color: #6b7280;
    margin-bottom: 3rem;
    line-height: 1.7;
  }

  .requirements {
    background: #f9fafb;
    padding: 2rem;
    border-radius: 0.75rem;
    margin-bottom: 3rem;
  }

  .requirements h2 {
    margin-top: 0;
    font-size: 1.5rem;
  }

  .requirements ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .requirements li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .faq {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid #e5e7eb;
  }

  .faq h2 {
    font-size: 1.875rem;
    margin-bottom: 2rem;
  }

  dl {
    display: grid;
    gap: 2rem;
  }

  dt {
    font-weight: 600;
    font-size: 1.125rem;
    color: #111;
  }

  dd {
    margin: 0.5rem 0 0 0;
    color: #6b7280;
    line-height: 1.6;
  }
</style>
```

### `src/pages/releases/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

const releases = await getCollection('releases');
const sortedReleases = releases.sort((a, b) =>
  b.data.date.valueOf() - a.data.date.valueOf()
);
---

<Layout title="Release Notes - Celestra">
  <section class="releases-page">
    <div class="container">
      <h1>Release Notes</h1>
      <p class="intro">
        Track Celestra's evolution with detailed release notes for every version.
      </p>

      <div class="releases-list">
        {sortedReleases.map(release => (
          <article class="release-card">
            <div class="release-header">
              <h2>
                <a href={`/releases/${release.slug}`}>
                  {release.data.title}
                </a>
              </h2>
              <span class="version">{release.data.version}</span>
            </div>
            <time datetime={release.data.date.toISOString()}>
              {release.data.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {release.data.description && (
              <p class="description">{release.data.description}</p>
            )}
            <a href={`/releases/${release.slug}`} class="read-more">
              Read full notes →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
</Layout>

<style>
  .releases-page {
    padding: 4rem 2rem;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .intro {
    font-size: 1.125rem;
    color: #6b7280;
    margin-bottom: 3rem;
  }

  .releases-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .release-card {
    padding: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .release-card:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .release-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .release-card h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .release-card h2 a {
    text-decoration: none;
    color: #111;
  }

  .release-card h2 a:hover {
    color: #6366f1;
  }

  .version {
    background: #f3f4f6;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    white-space: nowrap;
  }

  time {
    display: block;
    color: #9ca3af;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .description {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .read-more {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
  }

  .read-more:hover {
    text-decoration: underline;
  }
</style>
```

### `src/pages/releases/[slug].astro`

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  const releases = await getCollection('releases');
  return releases.map(release => ({
    params: { slug: release.slug },
    props: { release },
  }));
}

const { release } = Astro.props;
const { Content } = await release.render();
---

<Layout title={`${release.data.title} - Celestra Release Notes`}>
  <article class="release-detail">
    <div class="container">
      <header class="release-header">
        <a href="/releases" class="back-link">← All Release Notes</a>
        <div class="title-section">
          <h1>{release.data.title}</h1>
          <div class="meta">
            <span class="version">{release.data.version}</span>
            <time datetime={release.data.date.toISOString()}>
              {release.data.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </header>

      <div class="content">
        <Content />
      </div>
    </div>
  </article>
</Layout>

<style>
  .release-detail {
    padding: 4rem 2rem;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .back-link {
    display: inline-block;
    color: #6366f1;
    text-decoration: none;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .release-header {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .meta {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .version {
    background: #f3f4f6;
    padding: 0.375rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
  }

  time {
    color: #9ca3af;
  }

  .content {
    line-height: 1.7;
    color: #374151;
  }

  .content :global(h2) {
    font-size: 1.75rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .content :global(h3) {
    font-size: 1.375rem;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .content :global(ul),
  .content :global(ol) {
    padding-left: 1.5rem;
  }

  .content :global(li) {
    margin-bottom: 0.5rem;
  }

  .content :global(code) {
    background: #f3f4f6;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
  }

  .content :global(pre) {
    background: #1f2937;
    color: #f3f4f6;
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  .content :global(pre code) {
    background: none;
    padding: 0;
  }
</style>
```

### `src/content/releases/v0.1.0.md` (Example)

```markdown
---
version: "0.1.0"
date: 2025-08-15
title: "Initial TestFlight Release"
description: "First public beta featuring core RSS feed management and Liquid Glass design."
featured: true
---

## Overview

Welcome to the first TestFlight beta of Celestra! This release establishes the foundation for iOS 26's most elegant RSS reader.

## New Features

### Feed Management
- Add RSS, Atom, and JSON Feed sources
- Organize feeds with folders and tags
- Smart feed refresh with background updates
- Offline article caching

### Reading Experience
- Liquid Glass design powered by iOS 26 APIs
- Typography optimization for long-form content
- Gesture-based navigation
- Reading progress tracking

### Sync & Storage
- iCloud sync across devices
- CloudKit public database for article caching
- Offline-first architecture
- Read state synchronization

## Known Issues

- Background refresh may be slow for feeds with 100+ items
- Some RSS feeds with non-standard formats may not parse correctly
- Image caching needs optimization for large galleries

## What's Next

Version 0.2.0 will focus on:
- Performance improvements
- Enhanced image handling
- Additional feed discovery features
- Polish and bug fixes

---

Thank you for being an early tester! Please submit feedback via TestFlight or email beta@celestr.app
```

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"

# Forms configuration
[forms]
  # Optional: Get email notifications when forms are submitted
  # [forms.testflight-signup]
  #   to = "your-email@example.com"
```

### `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://celestr.app',
  output: 'static',
  build: {
    format: 'directory',
  },
});
```

---

## Netlify Deployment

### Option 1: Via Netlify UI

1. Push your repo to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repo
5. Build settings should auto-detect:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### Custom Domain Setup

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter `celestr.app`
4. Follow DNS configuration instructions:
   - Add A record or CNAME as specified
   - Enable HTTPS (automatic with Let's Encrypt)

---

## Form Handling

### Testing Netlify Forms Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with Netlify functions
netlify dev
```

### Viewing Form Submissions

1. Go to Netlify dashboard
2. Navigate to "Forms" section
3. View all TestFlight signup submissions
4. Export to CSV or integrate with Zapier/webhooks

### Optional: Email Notifications

Add to `netlify.toml`:

```toml
[[forms.testflight-signup]]
  to = "beta@celestr.app"
  subject = "New TestFlight Signup"
```

---

## Content Management

### Adding New Release Notes

1. Create new file in `src/content/releases/`:

```bash
touch src/content/releases/v0.2.0.md
```

2. Add frontmatter and content:

```markdown
---
version: "0.2.0"
date: 2025-09-01
title: "Performance & Polish"
description: "Major performance improvements and UI refinements."
featured: false
---

## What's New
...
```

3. Deploy - release note will automatically appear on `/releases`

---

## Styling with Tailwind (Optional)

The setup includes basic CSS. To use Tailwind:

```bash
npx astro add tailwind
```

Then update components to use Tailwind classes instead of custom CSS.

---

## Next Steps

1. **Customize branding**: Update colors, fonts, and copy to match Celestra's brand
2. **Add analytics**: Consider privacy-friendly options like Plausible or Fathom
3. **Create privacy/terms pages**: Required before collecting emails
4. **Add og:image**: Create social sharing image for better link previews
5. **Set up email automation**: Use Netlify webhooks → Zapier → email service to send TestFlight invites

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server (localhost:4321)
npm run build           # Build for production
npm run preview         # Preview production build locally

# Deployment
netlify deploy          # Deploy draft
netlify deploy --prod   # Deploy to production
netlify open            # Open Netlify dashboard

# Forms
netlify forms list      # List all forms
netlify forms submissions # View submissions
```

---

## Performance Checklist

- [ ] Add `sitemap` integration: `npx astro add sitemap`
- [ ] Optimize images with Astro's image service
- [ ] Add RSS feed for release notes
- [ ] Configure caching headers in `netlify.toml`
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit

---

## Security Notes

- Netlify Forms include spam protection automatically
- HTTPS is enforced by default on `.app` TLD
- Form submissions are rate-limited by Netlify
- Consider adding reCAPTCHA for additional protection if spam becomes an issue

---

**Ready to build?** Run the Quick Start commands at the top of this file in your new repo!
