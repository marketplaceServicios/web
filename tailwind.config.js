/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E86C25',
          50: '#FDF3ED',
          100: '#FCE7DB',
          200: '#F8CEB7',
          300: '#F4B593',
          400: '#F09C6F',
          500: '#E86C25',
          600: '#C75A1D',
          700: '#A04816',
          800: '#79360F',
          900: '#522408',
        },
        forest: {
          DEFAULT: '#1B4332',
          50: '#E8F0ED',
          100: '#D1E1DB',
          200: '#A3C3B7',
          300: '#75A593',
          400: '#47876F',
          500: '#1B4332',
          600: '#163828',
          700: '#112B1F',
          800: '#0C1E15',
          900: '#07110C',
        },
        cream: {
          DEFAULT: '#F5F1EB',
          50: '#FDFCFB',
          100: '#FAF9F6',
          200: '#F5F1EB',
          300: '#E8E0D5',
          400: '#DBCFBF',
          500: '#CEBEA9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
