import { createApp } from 'vue'
import App from './App.vue'
import './theme/global.scss'

window.namespace = 'fanqie-download'

const app = createApp(App)

app.mount('#app')
