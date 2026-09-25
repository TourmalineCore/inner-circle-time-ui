import { defineConfig } from 'cypress'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3507`,
    env: {
      // the dev server proxies /api/time to the api container
      API_ROOT_URL: `http://localhost:3507/api/time`,
      // the mock server of time-api, it is not behind the proxy
      AUTH_API_ROOT_URL: `http://localhost:8507/api/auth`,
      USER_LOGIN: `AUTH_SLYTHERINE_TENANT_DRACO_MALFOY_LOGIN_WITH_ALL_PERMISSIONS`,
      USER_PASSWORD: `AUTH_SLYTHERINE_TENANT_DRACO_MALFOY_PASSWORD_WITH_ALL_PERMISSIONS`,
      // the api of a local run takes the debug token instead of a real auth flow
      DISABLE_DEBUG_TOKEN: false,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
})
