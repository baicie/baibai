import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App";
import { router } from "./router";
import { i18n } from "./i18n";
import "./styles/base.css";

const app = createApp(App);

app.use(createPinia()).use(router).use(i18n).mount("#app");
