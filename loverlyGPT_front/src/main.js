import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import "./mock/index.js"
import "./assets/inconfont/iconfont.css"
// import "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
