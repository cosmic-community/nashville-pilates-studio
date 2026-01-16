/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a5d4a',
          light: '#5d735d',
          dark: '#3d4d3d',
        },
        secondary: {
          DEFAULT: '#f5f3e7',
          light: '#faf9f4',
          dark: '#e8e5d4',
        },
        accent: {
          DEFAULT: '#c9a96e',
          light: '#d4ba85',
          dark: '#b89957',
        },
        olive: {
          50: '#f8f9f5',
          100: '#f0f2e9',
          200: '#dce1ce',
          300: '#c5ccab',
          400: '#a8b282',
          500: '#8d9962',
          600: '#727c4f',
          700: '#5a6140',
          800: '#4a5d4a',
          900: '#3d4a36',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf9f4',
          200: '#f5f3e7',
          300: '#ebe8d6',
          400: '#ddd8be',
          500: '#ccc4a0',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}