import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/reset.css'
import App from './App.vue'
// 引入图标字体
import './assets/font/inconfont/iconfont.css'
import './assets/font/font/fonts.css'
import './assets/font/font/iconfont.css'
// 引入pinia
import { createPinia } from 'pinia'
// 引入路由
import { router } from './router'
const app = createApp(App)
// 全局注册
app.use(ElementPlus)
// 挂载路由
app.use(router)
// 导入 pinia
app.use(createPinia())
// 挂载app
app.mount('#app')

