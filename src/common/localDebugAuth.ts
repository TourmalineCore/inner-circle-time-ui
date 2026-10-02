import { authService } from './authService'
import { DISABLE_DEBUG_TOKEN, DEBUG_TOKEN } from './config/config'

export function logInAsLocalDebugUserIfDebugTokenEnabled() {
  if (DISABLE_DEBUG_TOKEN !== `false`) {
    return
  }

  authService.setLoggedIn({
    accessToken: {
      value: DEBUG_TOKEN,
    },
  })
}
