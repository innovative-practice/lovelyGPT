import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './assets/main.css'
<<<<<<< HEAD
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
=======
const app = createApp(App)
app.use(ElementPlus)
>>>>>>> c1db235b813bb62173b3082e31d8a21f89504152
app.mount('#app')
