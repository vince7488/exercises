import { createVuetify } from "vuetify";

// Maps the Treehouse brand colours to the roles used across Vuetify components.
const treehouseLight = {
  dark: false,
  colors: {
    primary: "#599240",
    "on-primary": "#FFFFFF",
    secondary: "#735A53",
    "on-secondary": "#FFFFFF",
    background: "#FFFFFF",
    "on-background": "#48403E",
    surface: "#FFFFFF",
    "on-surface": "#48403E",
  },
  variables: {
    "border-color": "#48403E",
    "border-opacity": 1,
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "treehouseLight",
    themes: {
      treehouseLight,
    },
  },
  defaults: {
    VBtn: {
      color: "primary",
      variant: "flat",
    },
  },
});
