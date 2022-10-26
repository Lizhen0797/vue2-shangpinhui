import requests from './request'
import mockRequests from './mockRequest'

export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params, //当前这个接口，给服务器传递参数params，至少是一个空对象
})

export const reqGoodsInfo = (skuId) => (requests({
  url: `/item/${skuId}`,
  method: 'get',
}));

export const reqAddOrUpdateShopCart = (skuId, skuNum) => (requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})
)

export const reqGetShopCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

export const reqDeleteShopCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

export const reqUpdateShopCartCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

export const reqUserRegister = (data) => requests({
  url: "/user/passport/register",
  method: 'post',
  data: data
})

export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'post',
  data: data
})

export const reqGetUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})

export const reqGetUserAddressList = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

export const reqUserTradeInfoList = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'post',
  data: data
})

export const reqGetOrderInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

export const reqGetOrderPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get '
})

export const reqGetOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})

export const reqBannerList = () => mockRequests.get('/banner')

export const reqFloorList = () => mockRequests.get('/floor')
