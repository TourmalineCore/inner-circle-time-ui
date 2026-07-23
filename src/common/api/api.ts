import { Api } from "@tourmalinecore/inner-circle-time-api-js-client"
import { API_ROOT_URL } from "../config/config"
import { initApiInterceptors } from "./initApiInterceptors"

const apiClient = new Api({
  baseURL: API_ROOT_URL,
})

initApiInterceptors(apiClient.instance)

// keep it after the auth interceptors in initApiInterceptors so that it runs first (interceptors are invoked in a reverse registration order)
apiClient.instance.interceptors.request.use((config: any) => {
  // this is needed to correctly combine baseUrl like http://localhost:30090/api/time and url like /api/tracking/entries
  // into a correct local/prod env URL like http://localhost:30090/api/time/tracking/entries
  // otherwise we get http://localhost:30090/api/time/api/tracking/entries which doesn't work
  config.url = config.url.replace(`/api`, ``)

  return config
}, 
null,
)

// utility type that converts union to intersection.
// used to flatten all API controller methods into a single object type.
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

// get all methods from API controllers
type ControllerValues = typeof apiClient[keyof typeof apiClient]

// get final type with all API methods flattened
type CombinedApi = UnionToIntersection<ControllerValues>

// previously it contained only api object
// now it contains an object per api controller, like tracking, reporting, internal
// to keep things simple for ui we can combine all endpoints into an old single api facade object
const objectsWithEdnpoints = Object.values(apiClient)

const apiWithAllCombinedEndpoints = objectsWithEdnpoints
  .reduce(
    (acc, curr) => ({
      ...acc,
      ...curr, 
    }), 
    {},
  ) as CombinedApi

export const api = apiWithAllCombinedEndpoints