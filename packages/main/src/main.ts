import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// #region 基础样式
import './theme/global.scss'
// #endregion 样式

// #region 组件库
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/iconsets/mdi-svg'
// #endregion 组件库

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  }
})

app.use(vuetify).use(router).mount('#app')
