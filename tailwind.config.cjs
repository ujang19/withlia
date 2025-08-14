/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,mdx,tsx,jsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["RobotoVariable", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        heading: ["MontserratVariable", "ui-sans-serif", "system-ui"]
      },
      colors: {
        blue: "var(--blue)",
        orange: "var(--orange)",
        navy: "var(--navy)"
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};