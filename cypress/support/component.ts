import './commands'
import '../env-config'

/// <reference types="cypress" />

// styles
import '../../src/styles/index.scss'

// commands
import { mount } from 'cypress/react'
import moment from 'moment'

// This is necessary so that the calendar starts on Monday, not Sunday in component tests
moment.locale(`ru`, {
  week: {
    dow: 1, 
  },
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>,
      compareSnapshot(name: string, options?: any): Chainable<Element>,
    }
  }
}

Cypress.Commands.add(`mount`, mount)
