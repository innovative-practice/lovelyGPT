import axios from 'axios'

// 全局定义参数
axios.defaults.timeout = 30000000 // ms
// axios.defaults.withCredentials = true // 允许携带cookie

// 请求拦截器
axios.interceptors.request.use(
  (config): any => config,
  (error): any => Promise.reject(error)
)

axios.interceptors.response.use(
  (response): any => response,
  (error): any => Promise.reject(error)
)

const base = {
  axios: axios,
  baseUrl: 'http://127.0.0.1:4000',
  aiBaseUrl: 'https://api.openai.com',
  proDuctUrl: 'http://124.221.89.187:4200'
}

export default base