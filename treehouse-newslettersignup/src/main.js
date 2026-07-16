import { createApp } from "vue";
// needed for glyphs... navi
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./styles/main.scss";

createApp(App).use(router).use(vuetify).mount("#app");
