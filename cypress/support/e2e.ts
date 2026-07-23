import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      authByApi(): Chainable<any>,
      removeTaskEntries({
        date,
      }: {
        date: Date,
      }): Chainable<any>, 
      removeUnwellEntries({
        date,
      }: {
        date: Date,
      }): Chainable<any>, 
      removeAwayWithMakeUpTimeEntries({
        date,
      }: {
        date: Date,
      }): Chainable<any>, 
    }
  }
}
