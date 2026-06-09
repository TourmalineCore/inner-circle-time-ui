import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { authService } from './common/authService'
import { BrowserRouter } from 'react-router-dom'
import { refreshTokenAndSubscribe } from './common/api/refreshByInterval'
import { ENABLE_REFRESH_AUTH_TOKEN } from './common/config/config'

async function initApp() {
  if (ENABLE_REFRESH_AUTH_TOKEN === `true`) {
    await refreshTokenAndSubscribe()
  }

  ReactDOM
    .createRoot(document.getElementById(`root`)!)
    .render(
      <React.StrictMode>
        <authService.AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </authService.AuthProvider>
      </React.StrictMode >,
    )
}

initApp()
