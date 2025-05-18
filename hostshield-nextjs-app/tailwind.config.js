module.exports = {
  purge: ["./src/components/**/*.js", "./pages/**/*.js"],
  theme: {
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
      body: ["Inter"],
    },
    extend: {
      backgroundColor: {
        site: {
          main: "#9c2d1f",
          green: "#20cf0d",
          brown: "#cf6c0d",
          body: "#fafafa",
        },
        input: {
          error: "rgba(156, 45, 31, 0.1)",
          gray: "#f0f0f0",
          green: "#20cf0d",
          brown: "#cf6c0d",
        },
      },
      backgroundImage: {
        "section-gradient": "linear-gradient(to bottom, #cb5942 -66%,#9c2d1f)",
        "navbar-gradient": "linear-gradient(to bottom, #cb5942 -382%, #9c2d1f)",
        "navbar-logo-gradient":
          "linear-gradient(to bottom, #92291b -127%, #842316)",
      },
      colors: {
        site: {
          main: "#9c2d1f",
          green: "#20cf0d",
          brown: "#cf6c0d",
        },
      },
      textColor: {
        site: {
          main: "#9c2d1f",
          dark: "#313131",
          gray: "#8a8a8a",
          darkgray: "#868686",
          green: "#20cf0d",
          brown: "#cf6c0d",
          darkergray: "#5e5e5e",
        },
      },
      placeholderColor: {
        site: {
          main: "#9c2d1f",
          dark: "#313131",
          gray: "#8a8a8a",
          darkgray: "#868686",
          green: "#20cf0d",
          brown: "#cf6c0d",
          darkergray: "#5e5e5e",
        },
      },
      ringColor: {
        site: {
          main: "#9c2d1f",
          green: "#20cf0d",
          brown: "#cf6c0d",
        },
      },
      borderColor: {
        site: {
          darkgray: "#c8c8c8",
          dark: "#313131",
          main: "#9c2d1f",
          gray: "#cdcdcd",
          green: "#20cf0d",
          brown: "#cf6c0d",
        },
      },
      divideBorder: {
        site: {
          darkgray: "#c8c8c8",
          main: "#9c2d1f",
          gray: "#cdcdcd",
          green: "#20cf0d",
          brown: "#cf6c0d",
        },
      },
      borderRadius: {
        "r-4xl": "0 2rem 2rem 0",
      },
      padding: {
        "left-1.6": "0 0 0 1.6rem",
        5.5: "1.3rem",
        1.55: "1.55rem 1rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      fill: ["hover", "focus"],
    },
  },
  plugins: [
    require("tailwindcss"),
    require("precss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
  ],
};
