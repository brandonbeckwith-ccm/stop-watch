import { createApp } from 'vue'
import App from './App.vue'
import router from './router.ts'
import './style.css'
import '@ccm-engineering/ccm-common-style/styles/main.scss'
import '@ccm-engineering/ui-components/dist/style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
