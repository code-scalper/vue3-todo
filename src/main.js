import { createApp } from "vue";
import App from "./App.vue";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";

const app = createApp(App);
app.use(BootstrapIconsPlugin).mount("#app");
