import { API_ROOT_URL } from './config/config'

import { initApiInterceptors } from './api/initApiInterceptors'
import { Api } from '../../api'

const apiClient = new Api({
  // The generated API already contains /api/time, so it must be deleted in API_ROOT_URL
  baseURL: API_ROOT_URL.replace(`/api/time`, ``),
})

initApiInterceptors(apiClient.instance)

export const api = apiClient.api
