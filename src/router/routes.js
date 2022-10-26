import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail/'
import AddShopCartSuccess from '../pages/AddShopCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/MyOrder'
import GroupOrder from '../pages/Center/GroupOrder'



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
        name: 'trade',
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            show: true
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            show: true
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: {
            show: true
        },
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder,
                meta: {
                    show: true
                },
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder,
                meta: {
                    show: true
                },
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '*',
        redirect: '/home',
    },
]