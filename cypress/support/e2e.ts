import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      authByApi(): Chainable<any>,
      removeTaskEntries(date: Date): Chainable<any>, 
      removeUnwellEntries(date: Date): Chainable<any>, 
    }
  }
}
