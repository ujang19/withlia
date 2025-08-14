# WithLia – Astro + React Islands Landing

Static-first migration of the original single-page React landing to Astro with React Islands. Priorities: SEO, Core Web Vitals, Cloudflare Pages deployment, and preserving visual tone and UX.

Key outcomes
- Statically rendered HTML by default; only minimal interactive islands are hydrated.
- Lighthouse-ready: minimal JS, optimized font loading, prebuild OG image generation.
- Complete SEO: canonical, meta, OG/Twitter, JSON-LD, robots, and sitemap.
- Cloudflare Pages friendly: Astro preset, static output to dist.

Tech stack
- Astro 4 with TypeScript (strict via astro/tsconfigs/strict)
- React Islands: @astrojs/react
- Tailwind CSS: @astrojs/tailwind
- Sitemap: @astrojs/sitemap
- MDX support: @astrojs/mdx
- Framer Motion (island only)
- lucide-react (islands only), inline SVG for static sections
- Fonts: @fontsource-variable/montserrat and @fontsource-variable/roboto (font-display: swap)
- OG generator: Satori + @resvg/resvg-js (+ Sharp for JPEG)

Project structure
- Pages
  - src/pages/index.astro – main landing page composition
  - src/pages/robots.txt.ts – robots endpoint
- Layouts
  - src/layouts/BaseLayout.astro – SEO head, canonical, OG/Twitter, analytics
- Components
  - Static .astro: Hero, ValueProps, Pricing, CTA, Footer
  - React islands (.tsx): NavBar (client:idle), MotionShowcase (client:visible)
  - Helpers: Icons.tsx (lucide re-export)
- Lib
  - src/lib/seo.ts – site and defaults for metadata
  - src/lib/styles.ts – gridBG and brand helpers
- Styles
  - src/styles/globals.css – Tailwind base, fonts, CSS variables
- Assets
  - public/favicon.svg – app icon
  - public/og.jpg – generated at build via scripts/og.mjs

Hydration strategy
- client:visible – MotionShowcase (Framer Motion animations on the 7-day flow)
- client:idle – NavBar (small scroll-state)
- All other sections are pure static .astro for zero runtime JS.

SEO and metadata
- BaseLayout.astro sets:
  - title (with helper prefix), meta description
  - canonical URL (from props or default site)
  - OG/Twitter tags
  - Favicon
- index.astro includes JSON-LD:
  - Organization
  - Website
- Sitemap via @astrojs/sitemap (configured site in astro.config.ts)
- robots.txt served from src/pages/robots.txt.ts

Brand variables and accessibility
- CSS variables in :root (globals.css): --blue, --navy, --orange
- Headings: one h1 in Hero; h2 for sections
- Images: use width/height when applicable and loading=lazy; mostly static markup here
- Interactive controls include aria-labels and keyboard navigation (MotionShowcase)

Cloudflare Web Analytics
- Enabled via script tag in BaseLayout.astro with your provided token.
- To change token: search for CF_TOKEN in src/layouts/BaseLayout.astro.

Build-time OG image
- scripts/og.mjs generates:
  - public/og.jpg (preferred, JPEG 1200x630)
  - public/og.png (fallback)
- Uses Satori + Resvg; attempts Sharp for JPEG conversion.
- Automatically runs before build via the prebuild script.

Local development
- Prerequisites: Node 18.17+
- Install dependencies:
  - npm install
- Start dev server:
  - npm run dev
- Build (also generates OG image):
  - npm run build
- Preview build:
  - npm run preview

Cloudflare Pages deployment
- Framework preset: Astro
- Build command: npm run build
- Output directory: dist

Configuration points
- Canonical site URL
  - Set in astro.config.ts: site: "https://withlia.example"
  - Used for sitemap and SEO canonical links
- Analytics
  - src/layouts/BaseLayout.astro contains the CF token
- Open Graph image
  - Generated at prebuild to public/og.jpg
  - Default meta references /og.jpg; customize template in scripts/og.mjs
- Tailwind scanning
  - tailwind.config.cjs: "./src/**/*.{astro,html,mdx,tsx,jsx}", "./public/**/*.html"

Performance checklist
- JS is loaded only by islands (NavBar, MotionShowcase)
- Fonts are self-hosted via @fontsource-variable with swap
- Images are static; add width/height and lazy attributes for any <img> you add later
- No any in TypeScript; strict config applied

JSON-LD locations
- index.astro injects Organization and WebSite schema via scripts at the end of page.

Lighthouse target
- ≥95 in Performance, SEO, Best Practices, and Accessibility
- If needed, further tweaks:
  - Reduce island footprint (client:visible over client:load)
  - Ensure any added images are properly sized and lazy-loaded
  - Avoid unnecessary 3rd-party scripts

Troubleshooting
- MDX is enabled though not currently used; remove @astrojs/mdx if you want a slimmer base.
- If Sharp is missing on some environments, og.mjs falls back to PNG. Ensure proper build environment on Cloudflare Pages (Node 18) or remove the JPEG conversion step.

License
- Copyright © WithLia.