/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>,
    authByApi(): Chainable<any>,
    removeTaskEntries(date: Date): Chainable<any>, 
    removeUnwellEntries(date: Date): Chainable<any>, 
  }
}
