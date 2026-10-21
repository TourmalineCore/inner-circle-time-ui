/* eslint-disable no-undef */
import fs from 'fs'

// branch/commit the compose files are taken from, set in .devcontainer/devcontainer.json
const API_REPO_REF = encodeRef(process.env.API_REF)
const LAYOUT_UI_REPO_REF = encodeRef(process.env.LAYOUT_REF)

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

async function prepareLocalRunAsync() {
  await fetchRemoteFileAsync({
    url: API_COMPOSE_URL,
    path: API_COMPOSE_PATH,
  })

  await fetchRemoteFileAsync({
    url: LAYOUT_UI_COMPOSE_URL,
    path: LAYOUT_UI_COMPOSE_PATH,
  })

  // api-docker-compose.override.yml mounts this file into api-mock-server,
  // and add-debug-token takes the token for env-config.js from it
  if (API_LOCAL_PATH) {
    // copies the file from a local path instead of fetching it from GitHub
    fs.copyFileSync(
      `${API_LOCAL_PATH}/e2e/mock-server-initialization.json`, 
      MOCK_SERVER_CONFIG_PATH,
    )
  }
  else {
    await fetchRemoteFileAsync({
      url: MOCK_SERVER_CONFIG_URL,
      path: MOCK_SERVER_CONFIG_PATH,
    })
  }
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
}

prepareLocalRunAsync()
