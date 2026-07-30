import './commands'

export type EntriesToRemove = 'taskEntries' | 'unwellEntries' | 'awayWithMakeUpTimeEntries' | 'sickLeaveEntries' | 'vacationEntries'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      authByApi(): Chainable<any>,
      removeEntries({
        date,
        entriesToRemove,
      }: {
        date: Date,
        entriesToRemove: EntriesToRemove,
      }): Chainable<any>, 
    }
  }
}
