import { EntryType } from "../../../src/common/constants/entryType"

export class TimeTrackerPage {
  static visit() {
    cy.visit(`/time/tracking`)
  }

  static clickOnFirstTimeSlot() {
    cy.get(`.rbc-day-slot`)
      .find(`.rbc-timeslot-group`)
      .first()
      .find(`.rbc-time-slot`)
      .first()
      .scrollIntoView()
      .click({
        force: true, 
      })
  }

  static selectEntryType({
    entryType,
  }: {
    entryType: EntryType,
  }) {
    cy
      .getByData(`type-select`)
      // -1 because the values in select start from 0 but enum values start from 1
      .select(entryType - 1)
  }

  static clickBySubmitButton() {
    cy
      .getByData(`submit-button`)
      .click()
  }
}
