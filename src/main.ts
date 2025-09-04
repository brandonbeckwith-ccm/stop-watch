import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/route";
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.scss";

const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
};

const app = createApp(App);

app.use(router);
app.use(Toast, options);

app.mount("#app");
