import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.url
})

export default service
