/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "primary-dark": "#0f67c2",
        "background-light": "#f0f2f5",
        "background-dark": "#101922",
        "card-dark": "#1e293b",
        "card-light": "#ffffff",
        "surface-dark": "#1c232d",
        "border-dark": "#2d3745",
        "accent-success": "#0bda5b",
        "accent-warning": "#f59e0b",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"],
      },
      borderRadius: { "DEFAULT": "0.375rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
    },
  },
  plugins: [],
  darkMode: 'class',
}
