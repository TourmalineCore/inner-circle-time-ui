import axios from 'axios'
import { API_ROOT_URL } from './config/config'

import { initApiInterceptors } from './api/initApiInterceptors'
import { Api } from '../../api'

export const api = axios.create({
  baseURL: API_ROOT_URL,
})

const generatedApiClient = new Api({
  // The generated API already contains /api/time, so it must be deleted in API_ROOT_URL
  baseURL: API_ROOT_URL.replace(`/api/time`, ``),
})

initApiInterceptors(generatedApiClient.instance)
initApiInterceptors(api)

export const generatedApi = generatedApiClient.api
