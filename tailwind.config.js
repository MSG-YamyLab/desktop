export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'min-h-640': { raw: '(min-height: 700px)' }, 
      },
    },
    colors: {
      transparent: "transparent",
      white: "#f9f9f9",
      "primary-100": "#0D1B2A",
      "primary-200": "#1B263B",
      "primary-300": "#415A77",
      "primary-400": "#778DA9",
      "primary-500": "#E0E1DD",

      
      "side-100": "#17171C",  
      "side-200": "#1C1C23",
      "side-300": "#353540",
      "side-300": "#4A4E51",

      "panel-100":"#A1A1A1",
      "panel-200":"#53D08B",
      "panel-300":"#353540",
      "panel-400":"#1C1C23",
      "panel-500":"#F02037",


      "search-100": "#4A4E51",


      "secondary-100": "#465975",

      "red-100": "#e3f2fd",
    

      "grey-100": "#FAF8F8",
    

      "success-100": "#d1fae5",


      "danger-100": "#dc3545",
     

      "warning-100": "#FFF2DA",

      "info-100": "#CAF6F9",
  
      "purple-100": "#9B5277",

      "info-100": "#CAF6F9",
    },
  },
  plugins: [],
};
