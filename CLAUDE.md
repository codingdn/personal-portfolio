# CLAUDE.md

This file gives Claude context about this project so future sessions can pick up without re-reading the entire codebase.

## Project

Personal portfolio for Daneil Nguyen — software engineer, photographer, traveler. Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build (runs lint + type-check)
npm run start    # serve the production build
npm run lint     # ESLint via next lint
```

## Architecture

### Framework & Routing
- **Next.js 15 App Router** with `src/app/` directory
- Pages: `src/app/page.tsx` (Hero), `src/app/projects/page.tsx`, `src/app/photography/page.tsx`
- Root layout at `src/app/layout.tsx` — contains `<html>`, dark-mode inline script, ThemeProvider, CommandPaletteProvider, Nav, Footer

### Styling
- **Tailwind CSS v4** via `@tailwindcss/postcss` (PostCSS plugin, not Vite plugin)
- Config is in `src/app/globals.css` using `@import "tailwindcss"` and `@theme`
- Dark mode uses class strategy: `.dark` class on `<html>` toggled by ThemeContext
- A blocking inline `<script>` in `app/layout.tsx` sets the dark class before React hydrates to prevent flash

### Client vs Server Components
- Server components: `Hero`, `Projects`, `ProjectCard`, `Footer` (no interactivity)
- Client components (have `'use client'`): `Nav`, `CommandPalette`, `ThemeContext`, `Photography`, `PhotoGrid`, `GalleryView`, `Globe`, `USMap`
- `Globe` is additionally wrapped in `dynamic(() => import(...), { ssr: false })` in `Photography.tsx` because `react-globe.gl` runs Three.js code (`new MeshPhongMaterial`) at module load time

### Photography Section
The Photography page (`src/components/Photography.tsx`) has three modes toggled via a pill button group:

1. **Globe** — 3D interactive world map (`react-globe.gl` + Three.js). Countries are colored orange if visited. Clicking selects a country and shows its photos in `PhotoGrid` on the right. Country pills below the globe for quick selection. Data in `src/data/photography.ts`.

2. **USA** — 2D SVG choropleth map of US states (`d3-geo` + `us-atlas`). Visited states are orange. Clicking selects a state and shows its photos in `PhotoGrid`. State pills below the map. Data in `src/data/usa-photography.ts`. TopoJSON at `public/states-10m.json`.

3. **Gallery** — Masonry grid of all photos with multi-select filter pills. Selecting USA reveals a state sub-filter row (indented, left-bordered). Uses `yet-another-react-lightbox` for fullscreen view.

### Image Handling
- **`next/image`** used throughout for photo optimization
- Photos in `PhotoGrid` use `fill` + `aspect-square` container (thumbnail grid)
- Photos in `GalleryView` use `width`/`height` props (`1200×900` default) for masonry layout
- Cloudinary is pre-configured as a remote image host in `next.config.ts`
- Cloudinary URL pattern: `https://res.cloudinary.com/{cloud}/image/upload/w_1200,h_900,f_auto,q_auto/{path}`
- SVG icons live in `public/assets/` (github, linkedin, instagram, mail, floppy)

### Data Files
- `src/data/photography.ts` — `CountryPhotos[]`. Country names must match `world-atlas` exactly (e.g. `"United States of America"`, `"South Korea"`). TopoJSON at `public/countries-110m.json`.
- `src/data/usa-photography.ts` — `StatePhotos[]`. State names must match `us-atlas` exactly (e.g. `"California"`, `"New York"`).
- `src/data/projects.ts` — `Project[]` for the Projects page.

### Types
All shared types in `src/types/index.ts`:
- `Photo` — `{ src, caption?, width?, height? }`
- `CountryPhotos` — `{ countryCode, countryName, lat, lng, photos }`
- `StatePhotos` — `{ stateName, stateCode, photos }`
- `Project` — `{ title, description, tags, github?, live?, year }`

### Path Alias
`@/` maps to `src/` — configured in `tsconfig.json` and respected by Next.js.

### Command Palette
`⌘K` opens a command palette (Raycast-style). Commands live in `CommandPalette.tsx` and include theme toggle, navigation, and social links. Uses `useRouter` from `next/navigation`.

## Key Decisions & Non-Obvious Things

- **`suppressHydrationWarning` on `<html>`** — needed because the inline dark-mode script mutates the class before React's first render, causing a false hydration mismatch warning without it.
- **Globe must be `ssr: false`** — `react-globe.gl` constructs a `MeshPhongMaterial` at module scope. Even with `'use client'`, Next.js pre-renders client components on the server, which would throw. `ssr: false` skips server execution entirely.
- **Tailwind v4 dark mode variant** — defined as `@custom-variant dark (&:is(.dark, .dark *))` in `globals.css` because v4 no longer auto-configures dark mode from a config file.
- **`us-atlas` state names** — must be the full name exactly as in the TopoJSON (e.g. `"New York"` not `"NY"`). The `stateCode` field is separate and is not used for map matching.
- **`world-atlas` country names** — same constraint. Use `"United States of America"` not `"United States"`. The `displayName()` helper in Photography handles the display conversion.
- **Multi-select gallery filters** — country and state filters use `Set<string>` in React state. Always create a new `Set` (never mutate) to trigger re-renders. Deselecting US clears the state sub-filter.
