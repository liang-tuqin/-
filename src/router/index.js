import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from "../views/Main.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter)

//1.定义路由组件
//2.定义一些路由（每个路由都需要映射到一个组件）
const routes = [
    //主路由
    {
        path: '/',
        component: Main,
        name: 'main',
        redirect: '/home',
        //子路由
        children: [
            // { path: 'home', name: 'home', component: Home },
            // { path: 'user', name: 'user', component: User },
            // { path: 'mall', name: 'mall', component: Mall },
            // { path: 'page1', name: 'page1', component: PageOne },
            // { path: 'page2', name: 'page2', component: PageTwo }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }

]

//3.创建路由实例并传递routes配置
const router = new VueRouter({ routes })

//4.创建并挂载根实例
export default router