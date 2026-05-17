/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#4338ca',
          dark: '#818cf8',
          hover: '#3730a3',
          'dark-hover': '#a5b4fc',
        },
        surface: {
          DEFAULT: '#faf8f5',
          dark: '#0e0d0b',
          card: '#f3f0eb',
          'card-dark': '#1a1714',
        },
        ink: {
          DEFAULT: '#1a1714',
          dark: '#f0ece4',
          secondary: '#6b6560',
          'secondary-dark': '#8a8480',
          muted: '#9c9490',
          'muted-dark': '#605c58',
        },
        border: {
          DEFAULT: '#e8e3dc',
          dark: '#2a2724',
        },
      },
      maxWidth: {
        content: '1600px',
      },
    },
  },
  plugins: [],
};
