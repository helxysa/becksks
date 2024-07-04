import './global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import money from 'v-money3'
const config = {
  debug: false,
  masked: false,
  prefix: '',
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: 2,
  disableNegative: false,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  modelModifiers: {
      number: false,
  },
  shouldRound: true,
  focusOnRight: false,
}


const app = createApp(App)
app.use(router)
app.use(
    Vue3Toasity,
  {
    autoClose: 3000,
    // ...
  }
)

app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});

app.use(money,config)

app.mount('#app')
