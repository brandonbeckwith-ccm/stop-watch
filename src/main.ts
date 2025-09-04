import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router/index';
const app = createApp(App)
app.use(PrimeVue);
app.use(router)
app.mount('#app')
