/* eslint-disable no-undef */
import fs from 'fs'

// prepare-local-run downloads it, or copies it from API_LOCAL_PATH
const MOCK_SERVER_CONFIG_PATH = `./local-run/mock-server-initialization.json`

const ENV_CONFIG_PATH = `./public/env-config.js`

// find  "...all-permissions" or  "...ALL_PERMISSIONS"
const ALL_PERMISSIONS_LOGIN_PATTERN = /all[-_]permissions/i

function addDebugToken() {
  // there are no mocks before the first local-services:up, and without the token the app cannot log in
  if (!fs.existsSync(MOCK_SERVER_CONFIG_PATH)) {
    throw new Error(`${MOCK_SERVER_CONFIG_PATH} is not found, so env-config.js has no debug token. Run npm run local-services:up to download it`)
  }

  const mockServerConfig = JSON.parse(fs.readFileSync(MOCK_SERVER_CONFIG_PATH, `utf-8`))

  const localDebugJwt = readLocalDebugJwt({
    mockServerConfig,
  })

  const envConfig = fs.readFileSync(ENV_CONFIG_PATH, `utf-8`)

  // env.sh writes one key per line, so the token is added as a line of its own right after the opening brace, in the same shape as the keys env.sh puts there
  fs.writeFileSync(ENV_CONFIG_PATH, envConfig.replace(`window.__ENV__ = {\n`, `window.__ENV__ = {\n  DEBUG_TOKEN: "${localDebugJwt}",\n`))
}

// mock-server-initialization.json can have several /api/auth/login mocks
// we need the all-permissions one, so match on the login value, not just the path
function readLocalDebugJwt({
  mockServerConfig,
}) {
  const loginMock = mockServerConfig.find((mock) => (
    mock.httpRequest.path === `/api/auth/login`
    && ALL_PERMISSIONS_LOGIN_PATTERN.test(mock.httpRequest.body.login)
  ))

  return JSON.parse(loginMock.httpResponse.body).accessToken.value
}

addDebugToken()
