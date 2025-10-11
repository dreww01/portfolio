/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          // 50: "#f0fdf4",
          // 100: "#dcfce7",
          // 200: "#bbf7d0",
          // 300: "#86efac",
          // 400: "#4ade80",
          // 500: "#22c55e",
          // 600: "#16a34a",
          // 700: "#15803d",
          // 800: "#166534",
          // 900: "#14532d",

          // // orange
          // 50: "#fff7ed",
          // 100: "#ffedd5",
          // 200: "#fed7aa",
          // 300: "#fdba74",
          // 400: "#fb923c",
          // 500: "#f97316",
          // 600: "#ea580c",
          // 700: "#c2410c",
          // 800: "#9a3412",
          // 900: "#7c2d12",

          // // Coral / Peach
          // 50: "#fff1ee",
          // 100: "#ffe3dd",
          // 200: "#ffc4bb",
          // 300: "#ffa199",
          // 400: "#ff7e6b",
          // 500: "#ff5c3e",
          // 600: "#e64a32",
          // 700: "#b73826",
          // 800: "#8a281c",
          // 900: "#5c1810",

          // Mustard / Amber
          // 50: "#fff9ed",
          // 100: "#fff3d5",
          // 200: "#ffe6a8",
          // 300: "#ffd66d",
          // 400: "#ffbf3d",
          // 500: "#f9a826",
          // 600: "#d4881f",
          // 700: "#aa6919",
          // 800: "#7d4c13",
          // 900: "#532f0b",

          // Dusty Blue / Sky
          50: "#e6f4ff",
          100: "#cce9ff",
          200: "#99d5ff",
          300: "#66c0ff",
          400: "#33aaff",
          500: "#3a9ad9",
          600: "#2c7bb3",
          700: "#215c8d",
          800: "#174067",
          900: "#0d273f",

          // // Lavender / Lilac
          // 50: "#f9f3ff",
          // 100: "#f3e8ff",
          // 200: "#e5c8ff",
          // 300: "#d6a6ff",
          // 400: "#c384ff",
          // 500: "#9f7aea",
          // 600: "#8455c6",
          // 700: "#673da2",
          // 800: "#4b2b7b",
          // 900: "#321c55",

          // // Soft Sage / Olive Green
          // 50: "#f2f7f2",
          // 100: "#e6eee6",
          // 200: "#cce0cc",
          // 300: "#a3c9a3",
          // 400: "#7aa77a",
          // 500: "#4a7c59",
          // 600: "#3a6046",
          // 700: "#2a4835",
          // 800: "#1d3024",
          // 900: "#101811",
        },
      },
      keyframes: {
        glowLight: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(255,255,255,0.4)" },
          "50%": { boxShadow: "0 0 16px rgba(255,255,255,0.7)" },
        },
        glowDark: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(58,154,217,0.3)" },
          "50%": { boxShadow: "0 0 16px rgba(58,154,217,0.6)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        glowLight: "glowLight 4s ease-in-out infinite",
        glowDark: "glowDark 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },

      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
