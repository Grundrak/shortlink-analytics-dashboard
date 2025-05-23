/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',    // Indigo
        secondary: '#10B981',  // Emerald Green
        accent: '#F59E0B',     // Amber
        dark: '#1F2937',       // Slate Gray
        light: '#F3F4F6',      // Light Gray
      },
    },
  },
  plugins: [],
};
