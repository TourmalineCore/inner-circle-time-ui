import { EntryType } from "../../../src/common/constants/entryType"
import { TimeTrackerPage } from "../pages/TimeTrackerPage"

export class UnwellEntry {
  static add() {
    TimeTrackerPage.clickOnFirstTimeSlot()
        
    TimeTrackerPage.selectEntryType({
      entryType: EntryType.UNWELL,
    })

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`04:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`05:00`)

    TimeTrackerPage.clickBySubmitButton()
  }

  static update() {
    cy
      .contains(`Feeling unwell`)
      .click()

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`06:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`07:00`)

    cy
      .contains(`Update`)
      .click()
  }

  static checkAfterUpdate() {
    cy
      .contains(`Feeling unwell`)
      .click()

    cy
      .getByData(`start-time-input`)
      .should(`have.value`, `06:00`)
    
    cy
      .getByData(`end-time-input`)
      .should(`have.value`, `07:00`)
  }
}
