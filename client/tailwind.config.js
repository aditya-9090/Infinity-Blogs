/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your JS and JSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-bg)',
        secondary: 'var(--primary-text)',
        accent: 'var(--accent-color)',
        header: 'var(--header-bg)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add Roboto as a global sans-serif font
        // You can add more font options as needed
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable background color for dark mode
      textColor: ['dark'], // Enable text color for dark mode
    },
  },
  plugins: [],
};
