import axios from 'axios'
import { Session } from './storage'
import { ElMessageBox } from 'element-plus'

const service = axios.create({
  baseURL: process.env.URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})

service.interceptors.request.use(
  (config) => {
    const token: string = Session.get('token')
    if (token) {
      if (!config.headers) {
        config.headers = {
          'Content-Type': 'application/json'
        }
      }
      config.headers.Authorization = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (res) => {
    const data = res.data
    if (data && data.code && (data.code === 401 || data.code === 4001)) {
      Session.clear()
      window.location.href = '/'
      ElMessageBox.alert('您已被登出，请重新登录', '提示', {})
    } else {
      return res.data
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
