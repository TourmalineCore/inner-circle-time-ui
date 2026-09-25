# Inner-Circle-Time

## Dev Container

This repo and its infrastructure tailored for VSCode/GitHub Codespaces Dev Container centric development experience in Docker to achieve better isolation of the environment as well as its cross-platform support out of the box.

### Prerequisites

1. Install Docker Desktop (Windows, macOS) or Docker Engine (Linux)
2. Install Visual Studio Code.
3. Install all repo's recommended extensions including [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

### Develop inside Dev Container

Open this repo's folder in VSCode/Codespaces, it might immediately propose you to re-open it in a Dev Container or you can click on `Remote Explorer`, find plus button and choose the `Open Current Folder in Container` option and wait when it is ready.

When your Dev Container is ready, the VSCode window will be re-opened. Open a new terminal in this Dev Container which will be executing the commands under this prepared Linux container where we already have all pre-installed and pre-configured development related dependencies.

### What happens when the container starts

1. **`npm ci`** installs the exact dependency versions from `package-lock.json`. This runs once, when the container is created.
2. **`npm run create-config:local`** builds `public/env-config.js` out of the keys listed in `.env-vars`, taking their values from the container environment. The app reads this file in the browser.
3. **`npm run local-services:up`** downloads the compose files of the API and of layout-ui from GitHub, together with the API mock config, and starts those services. You do not need their repositories on your machine.

Steps 2 and 3 run on every container start, so each session begins with a fresh config and up to date images. You can also run both commands yourself, without restarting the container.

## Start the app

```bash
npm start
```

Then open http://localhost:3507/time/tracking.

`npm start` runs only the dev server. The config and the containers are ready before it.

## Configuration

The values of a local run live in two places.

| group | keys | where |
| :--- | :--- | :--- |
| runtime config the app reads in the browser | `API_ROOT_URL`, `AUTH_API_ROOT_URL`, `DISABLE_ACCESS_TOKEN_REFRESH`, `DISABLE_DEBUG_TOKEN` | `containerEnv` in `.devcontainer/devcontainer.json` |
| the images the local services run, and the branch their compose files come from | `LAYOUT_IMAGE_TAG`, `LAYOUT_REF`, `API_IMAGE_TAG`, `API_REF` | `containerEnv` in `.devcontainer/devcontainer.json` |
| the dev server port, and the services it proxies to | `UI_PORT`, `LAYOUT_UI_URL`, `API_URL` | `.env.local` |

`containerEnv` puts its keys into the environment of the container itself, so the scripts in `local-run`, `docker compose` and the Vite config all see them without opening a file. `.env.local` is read by the Vite config.

There are two ways to change a value, and you can mix them:

- **set it before a command** - `LAYOUT_IMAGE_TAG=sha-9c1e044 npm run local-services:up`. A value from the terminal wins over both places;
- **edit the file the key lives in** - the value stays until you change it back.

A variable written before a command applies to that command only. `VAR=1 npm run local-services:up && npm start` does not pass `VAR` to `npm start`, and a variable on a line of its own passes it to nothing. Use `export VAR=1` when you need it for several commands.

What you re-run after the change depends on the group the key is in.

**First group** - build the config again, then put the token back into it:

```
npm run create-config:local && npm run prepare-local-run
```

Both commands are needed. `create-config:local` writes `public/env-config.js` from scratch out of the keys listed in `.env-vars`, and `DEBUG_TOKEN` is not among them - it comes from the API mock config, and `prepare-local-run` appends it to the file afterwards. Run the build on its own and you are left without a token, so the app cannot log in. Reload the page once both commands are done.

**Second group** - start the services again:

```
npm run local-services:up
```

**Third group** - restart `npm start`. `vite.config.ts` reads these keys when the dev server starts, so the containers don't have to be touched.

An edit to `devcontainer.json` itself needs **Dev Containers: Rebuild Container** on top of that, because `containerEnv` is applied when the container is created. The rebuild runs `create-config:local` and then `local-services:up` on start, and the second of those runs `prepare-local-run` for you, so it covers the first two groups on its own. A one-off value before a command needs no rebuild.

Outside the Dev Container the keys of the first two groups are not set by anything, so pass them yourself for the commands that read them, or export them once in that terminal.

## Ports

| Service                           | Dev server | Docker Compose |
| :-------------------------------- | :--------: | :------------: |
| inner-circle-time-ui              |    3507    |       -        |
| inner-circle-layout-ui            |    4500    |      6500      |
| inner-circle-time-api             |    4507    |      6507      |
| inner-circle-time-api-db          |     -      |      7507      |
| inner-circle-time-api-mock-server |     -      |      8507      |

**Dev server** is the port a service uses when you start it from its own repo. **Docker Compose** is the port its container publishes. In local-env the app is served on `30090`.

## Run modes

### The app and the published services

What you get after `npm start`: the app in the dev server, the API and layout-ui in containers with the images from `containerEnv`.

The dev server proxies `/layout` to `LAYOUT_UI_URL` and `/api/time` to `API_URL`, and both point at those containers.

### A service from a feature branch

Every push to an open pull request publishes an image of that commit, tagged `sha-<commit sha>`. Both the short and the full form of the sha are published, and both work. A branch without an open pull request has no image.

Each service has two variables:

| service   | which image runs   | where its compose file and mocks come from |
| :-------- | :----------------- | :----------------------------------------- |
|    API    |   `API_IMAGE_TAG`  |                  `API_REF`                 |
| layout-ui | `LAYOUT_IMAGE_TAG` |                `LAYOUT_REF`                |

Put the tag in `containerEnv`, or set it for one run:

```
API_IMAGE_TAG=sha-6c3f5f2 npm run local-services:up
LAYOUT_IMAGE_TAG=sha-9c1e044 npm run local-services:up
```

The command restarts the containers only. The dev server can keep running, because it talks to the same ports. To do both steps in one line:

```
API_IMAGE_TAG=sha-6c3f5f2 npm run local-services:up && npm start
```

If Docker cannot find the tag, open the CI run of the pull request: the image appears only after the build ends.

The tag changes the image only. The compose file and the API mock config still come from `master`, so change the ref as well when your branch also edits those files:

```
API_IMAGE_TAG=sha-6c3f5f2 API_REF=feature/#1-test npm run local-services:up
```

Branch names with `#` need no quotes. All four variables are independent, so you can pin both services in one run.

### A service you run from its own repo

You start the service from its own repo, and tell the dev server to use it instead of the container.

**layout-ui.** Start it from its own repo with `npm run start:federation`, as its README describes in [Local run with module federation](https://github.com/TourmalineCore/inner-circle-layout-ui#local-run-with-module-federation). Then:

1. Stop the layout container, if one is running
```
npm run local-services:down:layout-ui
```
2. Send /layout to your local layout-ui instead
```
LAYOUT_UI_URL=http://localhost:4500/layout npm start
```

**The API.** Start it from its own repo, then:

1. Stop the API container, if one is running
```
npm run local-services:down:api
```
2. Send /api/time to your local API instead
```
API_URL=http://localhost:4507 npm start
```
In the Dev Container `localhost` is the container itself, not your machine, so an API running outside it is reachable as `http://host.docker.internal:4507`.

3. If your checkout also changes `mock-server-initialization.json`, take the mocks from there
```
API_LOCAL_PATH=../inner-circle-time-api npm run prepare-local-run
```

`API_LOCAL_PATH` changes one thing: the mock file is copied from your folder, not downloaded from GitHub. The mocks hold the debug token that the app uses to log in, so a new copy also updates that token in `env-config.js`.

`prepare-local-run` starts no containers, which is what you want here, because step 1 stopped them. Run `npm run local-services:up` instead when the mock server container has to use the new mocks as well - that command starts the API containers again.

This does not work inside the Dev Container. Only this repository is mounted there, so `../inner-circle-time-api` does not exist and the command fails with `ENOENT`. Run it from a terminal on your own machine instead, from the repo root - it writes the file into `local-run/`, which the container sees through the same mount.

### The app as a Docker image

The image the cluster runs. nginx serves it, not the dev server.

```
npm run docker:build
npm run docker:run
```

It listens on http://localhost:4457, but the image alone is not a working app. In the cluster the ingress removes the `/time` prefix before nginx sees it, and here nothing does, so the assets come back as `index.html`. Use this to check that the image builds and starts, and local-env to see the app run.

To build the image with the tag local-env uses:

```
npm run docker:build:local-env
```

## Stop the local services

`Ctrl+C` in the terminal of the dev server stops the dev server only. The containers keep running.

Stop everything this repo starts:
```
npm run local-services:down
```

Stop the API, its database and mock server:
```
npm run local-services:down:api
```

Stop the shared layout-ui container:
```
npm run local-services:down:layout-ui
```

Other UI services can use the same layout container, and an API started in its own Dev Container uses the same database and mock server. They all stop working if you shut everything down, so each part has a command of its own.

## Tests

**Component tests.**

```
npm run cypress:run:component     # in the console
npm run cypress:open:component    # in the Cypress window
npm test                          # for update screenshots
```

**E2E tests** run against the app in the dev server and against the mocked API, so start both first.

```
npm run cypress:run:e2e     # in the console
npm run cypress:open:e2e    # in the Cypress window
```

**E2E tests in local-env**, which serves the app on 30090:

```
npm run cypress:run:e2e:local-env     # in the console
npm run cypress:open:e2e:local-env    # in the Cypress window
```
