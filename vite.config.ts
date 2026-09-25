/* eslint-disable @typescript-eslint/quotes */
import { defineConfig, loadEnv } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// description about how to set up remote app configuration you can see in
// https://github.com/TourmalineCore/inner-circle-layout-ui/blob/master/vite.config.ts

const LOCAL_ENV_PORT = 30090

// eslint-disable-next-line import/no-default-export
export default defineConfig(({
  mode,
}) => {
  // the dev server port and the services it proxies to, from .env.local
  const localConfig = loadEnv(mode, process.cwd(), ``)

  const isLocalDev = mode === `development`

  // Set the port for the time based on the environment
  const TIME_PORT = isLocalDev ? Number(localConfig.UI_PORT) : LOCAL_ENV_PORT

  return {
    // Set the port on which the development server runs
    // Documentation: https://vitejs.dev/config/server-options.html#server-port
    server: {
      port: TIME_PORT,
      // without this Vite silently moves to the next free port when TIME_PORT is taken,
      // and you end up debugging an app that isn't the one you just started
      strictPort: true,
      proxy: {
        '/layout': {
          target: localConfig.LAYOUT_UI_URL,
          // the layout container's nginx serves it at root, so the prefix is stripped here.
          // a layout-ui started from its own repo has base: '/layout' instead, and LAYOUT_UI_URL
          // keeps the prefix for it: http://localhost:4500/layout
          rewrite: (path: string) => path.replace(/^\/layout/, ``),
        },
        // time-api serves its endpoints at root (/tracking/...), the /api/time prefix
        // only exists in the routing in front of it, so it is stripped here
        '/api/time': {
          target: localConfig.API_URL,
          rewrite: (path: string) => path.replace(/^\/api\/time/, ``),
        },
      },
    },
    // Base public path that is added to beginnings of static assets and routes in the generated HTML.
    // This affects how files like scripts, styles, and images are referenced in the final build.
    // Example: If an image is imported as `/assets/logo.png`, it will be resolved as `/time/assets/logo.png`.
    // Documentation: https://vitejs.dev/config/shared-options.html#base
    base: isLocalDev ? `/` : `/time`,
    plugins: [
      // Enable React support
      react(),
      // Enable SVG imports as React components
      svgr(),
      // Configure module federation
      // Example config https://github.com/originjs/vite-plugin-federation/blob/main/packages/examples/react-vite/host/vite.config.js
      // Doc https://vitejs.dev/config/
      federation({
        // Unique name for the application
        name: "inner_circle_time_ui",
        // The path where the remote application file can be found and its name
        remotes: {
          // `http://localhost:6500/assets/inner_circle_layout_ui.js` for local docker
          // `http://localhost:30090/layout/assets/inner_circle_layout_ui.js` for local-env
          inner_circle_layout_ui: `/layout/assets/inner_circle_layout_ui.js`,
        },
        // Shared dependencies to avoid duplication
        shared: [
          "react",
        ],
      }),
    ],
    define: {
      // Set a global variable to handle different base paths in various environments
      // This variable is used in HTML files to dynamically adjust script paths
      // In production, it will be `/time`, while in development it will be an empty string.
      // Example usage in HTML: <script src="%VITE_BASE_PATH%/env-config.js"></script>
      'import.meta.env.VITE_BASE_PATH': JSON.stringify(isLocalDev ? `` : `/time`),
    },
    // Build configuration
    build: {
      // For successful docker build
      // https://stackoverflow.com/questions/76616620/vite-refuses-to-use-the-correct-build-target-in-my-svelte-ts-project
      // https://github.com/Lenni009/vite-build-target-issue
      target: `esnext`,
    },
  }
})
