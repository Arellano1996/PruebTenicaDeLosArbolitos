const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceScale: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" }
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" }
        },
        toLeft: {
          "0%": { transform: "translateX(0) scale(1)" },
          "25%": { transform: "translateX(40px) scale(1.25)" },
          "40%": { transform: "translateX(-55px) scale(1)" },
          "100%": { transform: "translateX(0)" }
        },
        toRight: {
          "0%": { transform: "translateX(0) scale(1)" },
          "25%": { transform: "translateX(-40px) scale(1.25)"},
          "40%": { transform: "translateX(55px)" },
          "100%": { transform: "translateX(0)" }
        },
        derrotado: {
          "0%": { transform: "translateX(0) scale(1)", opacity: "1", filter: "grayscale(0%)" },
          "25%": { transform: "translateX(-5px) scale(1.05)", opacity: "0.8", filter: "grayscale(20%)" },
          "50%": { transform: "translateX(5px) scale(1.1)", opacity: "0.6", filter: "grayscale(40%)" },
          "75%": { transform: "translateX(-5px) scale(1.15)", opacity: "0.4", filter: "grayscale(60%)" },
          "100%": { transform: "translateX(0) scale(1)", opacity: "0.2", filter: "grayscale(100%)" }
        }
      },
      animation: {
        "bounce-scale": "bounceScale 0.5s ease-in-out",
        "shake": "shake 0.3s ease-in-out",
        "to-left": "toLeft 1s ease-in-out",
        "to-right": "toRight 1s ease-in-out",
        "derrotado": "derrotado 2s ease-out infinite",
      }
    }
  },
  plugins: [],
}

