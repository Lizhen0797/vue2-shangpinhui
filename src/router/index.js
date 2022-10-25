import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
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
      () => { },
      () => { }
    )
  }
}

Vue.use(VueRouter)

export default new VueRouter({
  routes: routes,
  scrollBehavior (_to, _from, _savedPosition) {
    return { y: 0 }
  }
})
