# Daneil Nguyen — Personal Portfolio

Personal portfolio site for Daneil Nguyen: software engineer, photographer, traveler. Happy stalking!

## Purpose

A minimal, dark-mode-capable portfolio showcasing:
- **Projects** — cards linking to GitHub and live demos
- **Photography** — interactive globe (international) and US state map, plus a filterable masonry gallery
- **Command palette** (`⌘K`) — keyboard-driven navigation and theme switching

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Globe | react-globe.gl + Three.js |
| US Map | d3-geo + us-atlas |
| Images | next/image (Cloudinary-ready) |
| Lightbox | yet-another-react-lightbox |

## Installation

```bash
git clone https://github.com/codingdn/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # development server with hot reload
npm run build    # production build (type-checks + lints)
npm run start    # serve the production build locally
npm run lint     # ESLint
```

## Project Structure

```
src/
  app/                   # Next.js App Router pages and root layout
    layout.tsx           # root layout (Nav, Footer, providers, dark-mode script)
    page.tsx             # / → Hero
    projects/page.tsx    # /projects
    photography/page.tsx # /photography
    globals.css          # Tailwind v4 entry + custom animations
  components/            # React components
  contexts/              # ThemeContext
  data/                  # Static content — edit these to add your own
    photography.ts       # visited countries + their photos
    usa-photography.ts   # visited US states + their photos
    projects.ts          # project cards
  types/index.ts         # shared TypeScript types
public/
  assets/                # SVG icons
  countries-110m.json    # world-atlas TopoJSON (globe)
  states-10m.json        # us-atlas TopoJSON (US map)
```

## Adding Content

### Projects

Edit `src/data/projects.ts`:

```ts
{
  title: 'My Project',
  description: 'What it does.',
  tags: ['React', 'TypeScript'],
  github: 'https://github.com/...',
  live: 'https://...',   // optional
  year: 2026,
}
```

### International Photos

Edit `src/data/photography.ts`. Country names must exactly match `world-atlas` (e.g. `"United States of America"`, `"South Korea"`):

```ts
{
  countryCode: 'JP',
  countryName: 'Japan',
  lat: 36,
  lng: 138,
  photos: [
    { src: 'https://res.cloudinary.com/...', caption: 'Tokyo', width: 1200, height: 900 },
  ],
}
```

### US State Photos

Edit `src/data/usa-photography.ts`. State names must exactly match `us-atlas` (full name, not abbreviation):

```ts
{
  stateName: 'California',
  stateCode: 'CA',
  photos: [
    { src: 'https://res.cloudinary.com/...', caption: 'Big Sur', width: 1200, height: 900 },
  ],
}
```

### Photo Hosting (Cloudinary)

Cloudinary is pre-configured as a remote image source in `next.config.ts`. Free tier: 25 GB bandwidth/month.

1. Upload photos to [Cloudinary](https://cloudinary.com)
2. Use transformation URLs:
   ```
   https://res.cloudinary.com/{cloud}/image/upload/w_1200,h_900,f_auto,q_auto/{path}
   ```
3. Set `width` and `height` on the `Photo` object to match the transformation dimensions — this lets `next/image` reserve layout space without knowing the intrinsic size

## Dev Notes

- **Dark mode** is class-based (`.dark` on `<html>`). A blocking inline script sets the class before React hydrates to prevent flash of unstyled content. Preference persists in `localStorage`.
- **Globe is `ssr: false`** — `react-globe.gl` instantiates a Three.js material at module scope, which crashes during server-side pre-rendering.
- **Tailwind v4** — uses `@tailwindcss/postcss`, not the old Vite plugin. The dark variant is declared via `@custom-variant` in `globals.css`.
- **All pages are statically pre-rendered** (`○ Static` in build output). No server is needed at runtime — the site can be deployed to Cloudflare Pages, Vercel, or Netlify free tiers.
