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
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['"Newsreader Variable"', 'Georgia', 'serif'],
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
      },
      maxWidth: {
        content: '75rem',
        prose: '68ch',
      },
      borderRadius: {
        chip: '6px',
        btn: '8px',
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow) / 0.06)',
        lift: '0 14px 30px -14px rgb(var(--shadow) / 0.28)',
      },
      fontSize: {
        display: ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        meta: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
      },
      transitionDuration: {
        150: '150ms',
      },
    },
  },
  plugins: [],
};
