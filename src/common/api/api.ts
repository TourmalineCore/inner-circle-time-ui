import { API_ROOT_URL } from "../config/config"
import { initApiInterceptors } from "./initApiInterceptors"
import { Api } from '@tourmalinecore/inner-circle-time-api-js-client'

const apiClient = new Api({
  baseURL: API_ROOT_URL,
})

initApiInterceptors(apiClient.instance)

export const api = apiClient.api
