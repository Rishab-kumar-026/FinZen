// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0f1c",
        primary: "#1db954",
        secondary: "#1e3c72",
        gradientStart: "#00ff87",
        gradientEnd: "#60efff",
        card: "rgba(255, 255, 255, 0.05)",
        stroke: "rgba(255, 255, 255, 0.15)",
      },
     keyframes: {
      bubbleFloat: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
    animation: {
      'bubble-float': 'bubbleFloat 3s ease-in-out infinite',
      'fade-in': 'fadeIn 0.8s ease-out',
    },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],

};
