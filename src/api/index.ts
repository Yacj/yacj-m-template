import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
}

interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

const service = axios.create({
  baseURL: import.meta.env.DEV && (import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL),
  timeout: 1000 * 60,
  responseType: 'json',
})
service.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  },
  (error) => {
    const message = error.message || '请求错误'
    return Promise.reject(message)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { code } = data
    if (typeof code !== 'undefined' && code !== 200) {
      return Promise.reject(new Error('Error'))
    }

    NProgress.done()
    return Promise.resolve(data)
  },
  (error) => {
    NProgress.done()
    const message = error.message || '请求错误'
    return Promise.reject(message)
  },
)

// 请求封装对象
const request = {
  /**
   * 发送 GET 请求
   *
   * @param {string} url - 请求的 URL
   * @param {object} data - 请求参数
   * @param {string} requestBaseUrl - 请求的基础 URL
   * @returns {Promise<T>} - Promise 对象，包含请求结果
   */
  get<T = any>(url: string, data?: any, requestBaseUrl?: string): Promise<T> {
    return request.request('GET', url, { params: data }, requestBaseUrl)
  },

  /**
   * 发送 POST 请求
   *
   * @param {string} url - 请求的 URL
   * @param {object} data - 请求参数
   * @param {string} requestBaseUrl - 请求的基础 URL
   * @returns {Promise<T>} - Promise 对象，包含请求结果
   */
  post<T = any>(url: string, data?: any, requestBaseUrl?: string): Promise<T> {
    return request.request('POST', url, { data }, requestBaseUrl)
  },

  /**
   * 发送上传文件的请求
   *
   * @param {string} url - 请求的 URL
   * @param {object} data - 请求参数
   * @param {string} requestBaseUrl - 请求的基础 URL
   * @returns {Promise<T>} - Promise 对象，包含请求结果
   */
  upload<T = any>(url: string, data?: any, requestBaseUrl?: string): Promise<T> {
    const headers = { 'Content-Type': 'multipart/form-data' }
    return request.request<T>('POST', url, { data, headers, requestBaseUrl })
  },

  /**
   * 发送通用请求
   *
   * @param {string} method - 请求方法（GET、POST 等）
   * @param {string} url - 请求的 URL
   * @param {object} data - 请求参数
   * @param {string} requestBaseUrl - 请求的基础 URL
   * @returns {Promise<T>} - Promise 对象，包含请求结果
   */
  request<T = any>(
    method = 'GET',
    url: string,
    data?: any,
    requestBaseUrl?: string,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, requestBaseUrl })
        .then((res) => {
          resolve(res.data as T)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
    })
  },
}


export default request
