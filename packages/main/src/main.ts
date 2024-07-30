import { createApp } from 'vue'
import router from './router'
import i18n from './locale'
import App from './App.vue'

// #region 基础样式
import './theme/global.scss'
// #endregion 样式

// #region 第三方插件
import overlays from '@tetap/overlastic-vue'
// #endregion 第三方插件

const app = createApp(App)

app.use(router).use(i18n)

// #region 第三方插件
app.use(overlays.install)
// #endregion 第三方插件

app.mount('#app')
