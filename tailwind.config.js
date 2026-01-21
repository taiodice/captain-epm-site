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
        // Deep Navigator Palette
        navy: {
          DEFAULT: '#0A1628',
          50: '#1E3A5F',
          100: '#172D4D',
          200: '#12253F',
          300: '#0E1D32',
          400: '#0A1628',
          500: '#060E1A',
          600: '#030710',
          700: '#010306',
          800: '#000000',
          900: '#000000',
        },
        ocean: {
          DEFAULT: '#0D9488',
          50: '#5EEAD4',
          100: '#4AE5CE',
          200: '#22D4BC',
          300: '#14B8A6',
          400: '#0D9488',
          500: '#0A7068',
          600: '#074D48',
          700: '#042928',
          800: '#010909',
          900: '#000000',
        },
        seafoam: {
          DEFAULT: '#5EEAD4',
          light: '#99F6E4',
          dark: '#2DD4BF',
        },
        surface: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#020617',
        },
        coral: '#F97316',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-ocean': 'linear-gradient(135deg, #0A1628 0%, #0D9488 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0A1628 0%, #0F172A 50%, #0D9488 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(94, 234, 212, 0.3)',
        'glow-ocean': '0 0 40px rgba(13, 148, 136, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(94, 234, 212, 0.15)',
      },
      animation: {
        'wave': 'wave 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-25px) translateY(10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
