import "./global.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import money from "v-money3";
import { MaskInput } from "vue-mask-next";

const app = createApp(App);
app.use(router);
app.use(Vue3Toasity, {
  autoClose: 3000,
  // ...
});

app.use(money);
app.component("MaskInput", MaskInput);

app.mount("#app");
