import { createApp } from 'vue'
import './style.css'
import '@ccm-engineering/ccm-common-style/styles/main.scss'
import '@ccm-engineering/ui-components/dist/style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
