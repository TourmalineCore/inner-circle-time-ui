/* eslint-disable @typescript-eslint/quotes */
import { defineConfig, loadEnv } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// description about how to set up remote app configuration you can see in
// https://github.com/TourmalineCore/inner-circle-layout-ui/blob/master/vite.config.ts

const BASE_PATH = process.env.NODE_ENV === `production` ? `/time` : ``

// eslint-disable-next-line import/no-default-export
export default defineConfig(({
  mode,
}) => {
  const localConfig = loadEnv(mode, process.cwd(), ``)

  return {
    server: {
      // Set the port on which the development server runs
      // Documentation: https://vitejs.dev/config/server-options.html#server-port
      port: Number(localConfig.UI_PORT),
      // proxy works in dev server only
      proxy: {
        '/layout': {
          target: localConfig.LAYOUT_UI_URL,
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
    base: BASE_PATH,
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
          // the dev server proxies this to LAYOUT_UI_URL, elsewhere the ingress routes it
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
      // Example usage in HTML: <script src="%VITE_BASE_PATH%/env-config.js"></script>
      // index.html loads env-config.js through this: /env-config.js from the dev server's public
      // folder, /time/env-config.js from the nginx of a built image
      'import.meta.env.VITE_BASE_PATH': JSON.stringify(BASE_PATH),
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
