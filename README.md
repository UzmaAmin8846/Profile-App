# Uzma Amin — Portfolio Site

A single-page personal portfolio built from Uzma Amin's CV data.

**Stack:** React 18 + TypeScript + Vite. Styling is plain CSS with CSS Modules
per component plus a shared token file (`src/styles/theme.css`) — no CSS
framework, per the brief. No routing library: navigation is anchor-based
smooth-scrolling within one page (see **Navigation** below for the
multi-page alternative if you'd rather use React Router).

## Design direction

- **Palette:** warm off-white surface (`#faf9f7`) with deep-indigo ink,
  and three accents — violet (`#6c5ce7`, design/Figma), teal (`#1fa398`,
  code/systems), coral (`#ff6b6b`, calls-to-action). Full dark theme included.
- **Type:** Space Grotesk (headings), Inter (body), JetBrains Mono (nav,
  tags, dates) — the mono face nods to the "developer" half of her title.
- **Signature element:** the header is styled like a browser tab bar
  (traffic-light dots + pill-shaped tabs), reinforcing "this person builds
  interfaces" without leaning on a stock hero-with-gradient template.

## Getting started

```bash
npm install
npm run dev       # starts Vite dev server at http://localhost:5173
```

Build for production:

```bash
npm run build      # type-checks with tsc, then outputs to dist/
npm run preview    # serve the production build locally
```

> This environment couldn't reach the npm registry to install packages and
> verify the build, so run `npm install && npm run build` locally as a
> first check after unzipping.

## Project structure

```
src/
  types.ts                 # CvData interfaces (Experience, Project, Skill, Contact, ...)
  data/cvData.ts            # All content — edit here, or load JSON (see below)
  hooks/useTheme.ts         # Light/dark theme state + persistence
  utils/generateResume.ts   # Printable HTML resume builder + download logic
  components/
    Header.tsx               # Sticky nav, smooth-scroll tabs, theme toggle, mobile menu
    Hero.tsx                 # Home + About sections (intro, experience/education timeline)
    ProjectsGrid.tsx         # Projects section
    SkillsChips.tsx          # Skills + certificates section
    ContactForm.tsx          # Contact links + validated form (mailto fallback)
    ProfilePhoto.tsx         # Photo with URL validation + placeholder fallback
    DownloadCvButton.tsx     # Download CV button
    Footer.tsx
  styles/theme.css          # Design tokens, resets, responsive breakpoints
public/
  cv.example.json           # Optional JSON content payload (see below)
```

## Editing content

Everything on the page comes from one object: `cvData` in `src/data/cvData.ts`,
typed against the interfaces in `src/types.ts` (`Profile`, `ContactInfo`,
`Experience`, `EducationItem`, `Project`, `SkillGroup`, `Certificate`).
Edit that file directly to change any text.

**Prefer JSON instead of code?** `src/data/cvData.ts` also exports
`loadCvData(jsonUrl)`, an async loader that fetches and type-checks a JSON
file against the same `CvData` shape. Copy `public/cv.example.json` to
`public/cv.json`, fill it in, and call `loadCvData()` from a `useEffect` in
`App.tsx` in place of the static `cvData` import.

## Profile photo

Set `profile.photoUrl` in `cvData.ts` to any hosted image URL. `ProfilePhoto.tsx`:

- Validates the string parses as an absolute `http(s)` URL before rendering it.
- Falls back to a generated initials placeholder (with proper `alt`/`aria-label`
  text) if the URL is missing, malformed, or the image fails to load at
  runtime (broken link, 404, CORS).

## Downloadable CV

`DownloadCvButton` calls `downloadCv()` in `src/utils/generateResume.ts`:

- If `contact.cvFileUrl` is set (a hosted PDF), it downloads that file directly.
- Otherwise it **generates a printable HTML resume** from the same `cvData`
  object client-side and downloads it as `Name_Resume.html`. Opening that
  file and using the browser's print dialog ("Save as PDF") produces a
  clean one-page PDF — no server or PDF library required.

## Navigation

Current implementation: single page, anchor-based (`#home`, `#about`,
`#projects`, `#skills`, `#contact`) with smooth scrolling
(`scroll-behavior: smooth` in `theme.css`) and an `IntersectionObserver` in
`Header.tsx` that highlights the active section via `aria-current`.

**To switch to multi-page routing instead:** install `react-router-dom`,
turn each section component into a route element, and replace the anchor
`<a href="#id">` tags in `Header.tsx` with `<Link to="/id">`. The data
layer (`cvData.ts`, `types.ts`) doesn't need to change either way.

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, one `<h1>`.
- Skip-to-content link, visible focus rings (`:focus-visible`) everywhere,
  including on custom buttons and links.
- Form fields have associated `<label>`s, `aria-invalid`, and
  `aria-describedby` error messages announced via `role="alert"`.
- Profile photo/placeholder always has descriptive `alt`/`aria-label` text.
- `prefers-reduced-motion` respected (disables smooth scroll & transitions).
- Color pairs (ink on background, chip text on surface, button text on
  accent) were chosen to stay at or above WCAG AA contrast in both themes;
  re-check with a contrast checker if you change the palette.
- Mobile nav toggle uses `aria-expanded` / `aria-controls`.

## Responsive breakpoints

Mobile-first; two breakpoints defined in `theme.css` and reused throughout
components: `max-width: 1023px` (tablet) and `max-width: 639px` (mobile).
The hero, about timeline, projects grid, and skills grid all reflow to a
single column below tablet width; the header collapses to a hamburger menu
below 767px.

## Theme toggle

`useTheme.ts` reads `prefers-color-scheme` on first load, then persists the
user's explicit choice to `localStorage` (guarded with try/catch, so it
degrades gracefully in private browsing). Toggled via the sun/moon button
in the header; theme is applied through a `data-theme` attribute on
`<html>` and CSS custom properties in `theme.css`.
