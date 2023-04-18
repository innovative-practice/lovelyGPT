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
  baseUrl: 'http://127.0.0.1:3000',
  aiBaseUrl: 'https://api.openai.com'
}

export default base