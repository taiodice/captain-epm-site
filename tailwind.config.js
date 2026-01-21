/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Theme
        ocean: {
          dark: '#0a192f',
          DEFAULT: '#112240',
          light: '#1d3557',
        },
        teal: {
          DEFAULT: '#64ffda',
          dark: '#4fd1c5',
        },
        slate: {
          light: '#ccd6f6',
          DEFAULT: '#8892b0',
          dark: '#495670',
        },
        // Legacy primary (kept for compatibility)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
