/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [require("tailwind-scrollbar")],
  theme: {
    extend: {
      backgroundImage: {
        lobby: "url('/images/lobby_backgrounds/background_initial_page.png')",
        lobby02:
          "url('/images/lobby_backgrounds/background_initial_page_option_02.png')",
        lobby03:
          "url('/images/lobby_backgrounds/background_initial_page_option_03.png')",
        lobby04:
          "url('/images/lobby_backgrounds/background_initial_page_option_04.png')",
        lobby05:
          "url('/images/lobby_backgrounds/background_initial_page_option_05.png')",
      },
      fontSize: {
        "1xs": "0.75rem",
      },
      screens: {
        tablet2x: "812px",
        // => @media (min-width: 640px) { ... }
      },
      maxWidth: {
        1290: "1290px",
      },
      colors: {
        primary: { 300: "#2b2b2b", 500: "#202020", 700: "#181818" },
        secondary: { 300: "#2b2b2b", 500: "#1a2328", 700: "#181818" },
      },
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"],
        KanitRegular: ["KanitRegular", "sans-serif"],
        KanitBold: ["KanitBold", "sans-serif"],
        AntonRegular: ["AntonRegular", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        poppins_bold: ["Poppins Bold", "sans-serif"],
        poppins_semi_bold: ["Poppins Semi Bold", "sans-serif"],
        poppins_extra_bold: ["Poppins Extra Bold", "sans-serif"],
        poppins_italic: ["Poppins Bold Italic", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        nunito_bold: ["Nunito Bold", "sans-serif"],
        nunito_semi_bold: ["Nunito Semi Bold", "sans-serif"],
        nunito_extra_bold: ["Nunito Extra Bold", "sans-serif"],
        spartan: ["Spartan", "sans-serif"],
        spartan_bold: ["Spartan Bold", "sans-serif"],
        spartan_extra_bold: ["Spartan Extra Bold", "sans-serif"],
      },
      animation: {
        bgBoosted: "bgBoosted .35s ease infinite",
        lightAnimation: "lightAnimation .35s linear infinite",
      },
      keyframes: {
        bgBoosted: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "100% 50%",
          },
        },
        lightAnimation: {
          "0%": {
            transform: "translateX(-100%) translateY(-100%) rotate(45deg)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(100%) translateY(100%) rotate(45deg)",
            opacity: "1",
          },
        },
      },
    },
  },
};
