import Vue from 'vue'
import Router from 'vue-router'
//路由懒加载
const login = resolve => require(['../login.vue'], resolve);
const Apps = resolve => require(['../App.vue'], resolve);
const HelloWorld = resolve => require(['../components/HelloWorld'], resolve);
const second = resolve => require(['../components/second'], resolve);
const detail = resolve => require(['../components/detail'], resolve);

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
