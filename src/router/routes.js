import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail/'
import AddShopCartSuccess from '../pages/AddShopCartSuccess'
import ShopCart from '../pages/ShopCart'

export default [
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
        name: 'search',
        component: Search,
        meta: {
            show: true,
        },
        // props: ($route) => ({
        //   keyword: $route.params.keyword,
        //   k: $route.query.k,
        // }),
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false,
        },
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true,
        }
    },
    {
        name: 'addshopcartsuccess',
        path: '/addshopcartsuccess',
        component: AddShopCartSuccess,
        meta: {
            show: true
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: '*',
        redirect: '/home',
    },
]