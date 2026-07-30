import './commands'

export type EntryTypeToRemove = 'taskEntries' | 'unwellEntries' | 'awayWithMakeUpTimeEntries' | 'sickLeaveEntries' | 'vacationEntries'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      authByApi(): Chainable<any>,
      removeEntriesByType({
        date,
        entryTypeToRemove,
      }: {
        date: Date,
        entryTypeToRemove: EntryTypeToRemove,
      }): Chainable<any>, 
    }
  }
}
