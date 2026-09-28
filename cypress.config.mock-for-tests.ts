import { defineConfig } from 'cypress'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3507`,
    env: {
      API_ROOT_URL: `http://localhost:3507/api/time`,
      AUTH_API_ROOT_URL: `http://localhost:8507/api/auth`,
      USER_LOGIN: `AUTH_SLYTHERINE_TENANT_DRACO_MALFOY_LOGIN_WITH_ALL_PERMISSIONS`,
      USER_PASSWORD: `AUTH_SLYTHERINE_TENANT_DRACO_MALFOY_PASSWORD_WITH_ALL_PERMISSIONS`,
      // authorize via the local debug token instead of a real auth flow
      DISABLE_DEBUG_TOKEN: false,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
})
