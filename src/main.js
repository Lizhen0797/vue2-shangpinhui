import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'

import store from './store'
import './mock/mockServe'
import 'swiper/css/swiper.css'

import * as api from './api'

import { MessageBox } from 'element-ui';


Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: (h) => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$api = api
  },
  router,
  store,
}).$mount('#app')
