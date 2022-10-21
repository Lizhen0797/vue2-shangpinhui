import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

requests.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  },
  // eslint-disable-next-line no-unused-vars
  (_error) => {
    return Promise.reject(new Error('faile')) //响应失败的回调函数 终止promise链
  }
)
export default requests
