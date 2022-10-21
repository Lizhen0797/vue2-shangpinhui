import requests from './request'
import mockRequests from './mockRequest'

export const reqCategoryList = () =>
  requests.get('/product/getBaseCategoryList')

export const reqBannerList = () => mockRequests.get('/banner')
export const reqFloorList = () => mockRequests.get('/floor')
