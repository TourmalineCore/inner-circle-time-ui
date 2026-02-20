import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      compareSnapshot(name: string, options?: any): Chainable<Element>,
      removeTaskEntries(date: Date): Chainable<void>,
      removeUnwellEntries(date: Date): Chainable<any>, 
    }
  }
}
