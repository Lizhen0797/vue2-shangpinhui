import requests from './request'
import mockRequests from './mockRequest'

export const reqCategoryList = () =>
  requests.get('/product/getBaseCategoryList')

export const reqGetSearchInfo = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params, //当前这个接口，给服务器传递参数params，至少是一个空对象
  })

export const reqBannerList = () => mockRequests.get('/banner')
export const reqFloorList = () => mockRequests.get('/floor')
