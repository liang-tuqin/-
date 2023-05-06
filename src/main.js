import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import { Container, Header, Aside, Main } from 'element-ui';
import App from './App.vue'
import router from './router';
import store from "./store";
import './api/mock'
import Cookie from "js-cookie";

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token是否存在
  const token = Cookie.get('token')
  //token不存在，说明当前用户是没登录，应该跳转到登录页面
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {//token存在，跳转到hme页面
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
