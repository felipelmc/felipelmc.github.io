/** @type {import('tailwindcss').Config} */

// Colors are CSS variables holding RGB triplets (defined for both themes in
// src/styles/global.css), so one class like `text-ink` works in light and
// dark mode and supports opacity modifiers (`bg-canvas/85`).
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // The Source superfamily: sans for text and labels, serif for names,
      // headings and titles, mono only for code (the BibTeX dialog).
      fontFamily: {
        sans: ['"Source Sans 3 Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
        mono: ['"Source Code Pro Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        canvas: v('bg'),
        panel: v('surface'),
        sunken: v('sunken'),
        line: { DEFAULT: v('line'), strong: v('line-strong') },
        ink: {
          DEFAULT: v('ink'),
          2: v('ink-2'),
          3: v('ink-3'),
        },
        accent: { DEFAULT: v('accent'), ink: v('accent-ink') },
        award: v('award'),
        link: v('link'),
      },
      maxWidth: {
        content: '70rem',
        prose: '66ch',
      },
      // Every page is a 12rem rail (portrait, section names, page index) and a
      // content column, from `lg` up; dated lists hang their dates in 7rem.
      gridTemplateColumns: {
        rail: '12rem minmax(0, 1fr)',
        dated: '7rem minmax(0, 1fr)',
      },
      borderRadius: {
        chip: '3px',
        btn: '4px',
        card: '6px',
      },
      boxShadow: {
        lift: '0 14px 30px -14px rgb(var(--shadow) / 0.28)',
      },
      fontSize: {
        display: ['clamp(2.5rem, 5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        meta: ['0.8125rem', { lineHeight: '1.25rem' }],
        // One size for entry, card and paper titles; one for taglines.
        h3: ['1.1875rem', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        small: ['0.9375rem', { lineHeight: '1.6' }],
      },
      transitionDuration: {
        150: '150ms',
      },
    },
  },
  plugins: [],
};
