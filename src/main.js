import "./global.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import money from "v-money3";
import { MaskInput } from "vue-mask-next";
import VueAwesomePaginate from "vue-awesome-paginate"
import "vue-awesome-paginate/dist/style.css";
import PrimeVue from 'primevue/config';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(Vue3Toasity, {
  autoClose: 3000,
  // ...
});
app.use(money);
app.use(VueAwesomePaginate);
app.component("MaskInput", MaskInput);


app.mount("#app");
