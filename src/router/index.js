import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        show: true,
      },
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false,
      },
    },
    {
      path: '/search/:keyword?',
      component: Search,
      meta: {
        show: true,
      },
      name: 'search',
    },
    {
      path: '/register',
      component: Register,
      meta: {
        show: false,
      },
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
})
