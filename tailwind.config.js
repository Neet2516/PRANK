/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 26px 80px rgba(126, 48, 89, 0.28)",
        button: "0 18px 34px rgba(217, 31, 96, 0.28)",
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 420ms cubic-bezier(.2,.8,.2,1)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-18px) scale(1.35)" },
        },
        pop: {
          "0%": { transform: "scale(.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
