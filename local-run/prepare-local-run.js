/* eslint-disable no-undef */
import fs from 'fs'

// branch/commit the compose files are taken from, set in .devcontainer/devcontainer.json
const API_REPO_REF = encodeRef(process.env.API_REF)
const LAYOUT_UI_REPO_REF = encodeRef(process.env.LAYOUT_REF)

// path to a local inner-circle-time-api checkout, e.g. ../inner-circle-time-api
// set this to test with mock-server-initialization.json changes you haven't pushed yet
const API_LOCAL_PATH = process.env.API_LOCAL_PATH

const API_REPO_URL = `https://raw.githubusercontent.com/TourmalineCore/inner-circle-time-api/${API_REPO_REF}`

const MOCK_SERVER_CONFIG_URL = `${API_REPO_URL}/e2e/mock-server-initialization.json`
const MOCK_SERVER_CONFIG_PATH = `./local-run/mock-server-initialization.json`

const API_COMPOSE_URL = `${API_REPO_URL}/docker-compose.yml`
const API_COMPOSE_PATH = `./local-run/api-docker-compose.yml`

const LAYOUT_UI_REPO_URL = `https://raw.githubusercontent.com/TourmalineCore/inner-circle-layout-ui/${LAYOUT_UI_REPO_REF}`

const LAYOUT_UI_COMPOSE_URL = `${LAYOUT_UI_REPO_URL}/docker-compose.yml`
const LAYOUT_UI_COMPOSE_PATH = `./local-run/layout-ui-docker-compose.yml`

const ENV_CONFIG_PATH = `./public/env-config.js`

// find  "...all-permissions" or  "...ALL_PERMISSIONS"
const ALL_PERMISSIONS_LOGIN_PATTERN = /all[-_]permissions/i

async function prepareLocalRunAsync() {
  await fetchRemoteFileAsync({
    url: API_COMPOSE_URL,
    path: API_COMPOSE_PATH,
  })

  await fetchRemoteFileAsync({
    url: LAYOUT_UI_COMPOSE_URL,
    path: LAYOUT_UI_COMPOSE_PATH,
  })

  // also written to disk: api-docker-compose.override.yml mounts this file into api-mock-server
  const mockServerConfigBody = API_LOCAL_PATH
    ? copyLocalFile({
      from: `${API_LOCAL_PATH}/e2e/mock-server-initialization.json`,
      to: MOCK_SERVER_CONFIG_PATH,
    })
    : await fetchRemoteFileAsync({
      url: MOCK_SERVER_CONFIG_URL,
      path: MOCK_SERVER_CONFIG_PATH,
    })
  const mockServerConfig = JSON.parse(mockServerConfigBody)

  const localDebugJwt = readLocalDebugJwt({
    mockServerConfig,
  })

  const envEntries = `DEBUG_TOKEN: "${localDebugJwt}",`

  // writes the mock server's token into env-config.js so the local app can use it
  injectIntoEnvConfig({
    path: ENV_CONFIG_PATH,
    envEntries,
  })
}

// escapes `#`, which would otherwise start a URL fragment, but also escapes `/`,
// which needs to stay a path separator
function encodeRef(ref) {
  return encodeURIComponent(ref)
    .replaceAll(`%2F`, `/`)
}

// fetches a file from `url` and saves a copy of it to disk at `path`
async function fetchRemoteFileAsync({
  url,
  path,
}) {
  const response = await fetch(url)
  const body = await response.text()

  fs.writeFileSync(path, body)

  return body
}

// copies a file from a local path instead of fetching it from GitHub
function copyLocalFile({
  from,
  to,
}) {
  const body = fs.readFileSync(from, `utf-8`)

  fs.writeFileSync(to, body)

  return body
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

// drops the entries a previous run added, so re-running doesn't append duplicates. If there is
// no env-config.js yet (local-services:up without create-config:local), nothing to inject into
function injectIntoEnvConfig({
  path,
  envEntries,
}) {
  if (!fs.existsSync(path)) {
    return
  }

  const fileBuffer = fs.readFileSync(path)
  const content = fileBuffer.toString()
  const contentWithoutOldEntries = content.replace(/^ *DEBUG_TOKEN: "[^"]*",\n/m, ``)

  // env.sh writes one key per line, so the entry is added as a line of its own right after
  // the opening brace, in the same shape as the keys env.sh puts there
  fs.writeFileSync(path, contentWithoutOldEntries.replace(`window.__ENV__ = {\n`, `window.__ENV__ = {\n  ${envEntries}\n`))
}

prepareLocalRunAsync()
