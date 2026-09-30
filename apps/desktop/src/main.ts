import {
  createApp,
} from "vue";

import App from "./App.vue";

import {
  i18n,
} from "./i18n";

import "flag-icons/css/flag-icons.min.css";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";

const app =
  createApp(App);

app.use(i18n);

app.mount("#app");