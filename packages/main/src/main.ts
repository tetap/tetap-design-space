import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'normalize.css'
import './theme/global.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')

document.getElementById('loading')?.classList?.add('hidden')
