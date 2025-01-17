/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#131928",
          "200": "#080d1c",
          "300": "#080d1b",
          "400": "rgba(22, 33, 66, 0.19)",
        },
        white: "#fff",
        sandybrown: "#fdad5b",
        royalblue: {
          "100": "#4d76ff",
          "200": "rgba(77, 118, 255, 0.1)",
        },
        darkslateblue: "rgba(39, 57, 108, 0.32)",
        steelblue: "#757cb0",
        lightsteelblue: "#b9c5e2",
      },
      spacing: {},
      fontFamily: {
        trispace: "Trispace",
        anta: "Anta",
      },
      borderRadius: {
        "10xs": "3px",
        "8xs": "5px",
        "blur-100": "4px",
        "corner-extra-small": "4px",
        "radius-sm": "8px",
      },
    },
    fontSize: {
      "131xl": "150px",
      "18xl": "37px",
      "41xl": "60px",
      "5xl": "24px",
      lg: "18px",
      "17xl": "36px",
      "3xl": "22px",
      "10xl": "29px",
      "21xl": "40px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq975: {
        raw: "screen and (max-width: 975px)",
      },
      mq950: {
        raw: "screen and (max-width: 950px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq700: {
        raw: "screen and (max-width: 700px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
