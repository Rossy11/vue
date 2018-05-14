import Vue from 'vue'
import Router from 'vue-router'
import login from '../login.vue'
import Apps from '../App.vue'
import HelloWorld from '../components/HelloWorld'
import second from '../components/second'
import detail from '../components/detail'

Vue.use(Router)

const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/Apps",
    name: "Apps",
    component: Apps,
    children: [
      {
        path: "/HelloWorld",
        name: "HelloWorld",
        component: HelloWorld
      },
      {
        path: "/second",
        name: "second",
        component: second
      },
      {
        path: "/detail",
        name: "detail",
        component: detail
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

var router = new Router({
  linkActiveClass:'list-active', //设置当前路由style
  routes
})
export default router;
