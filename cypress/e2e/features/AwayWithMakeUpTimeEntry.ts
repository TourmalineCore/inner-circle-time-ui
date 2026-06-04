import { TimeTrackerPage } from "../pages/TimeTrackerPage"

export class AwayWithMakeUpTimeEntry {
  static add() {
    TimeTrackerPage.clickOnFirstTimeSlot()
        
    cy
      .getByData(`type-select`)
      .select(2)

    cy
      .getByData(`description-input`)
      .clear()
      .type(`I need to go to the hospital.`)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`13:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`14:00`)
    
    cy
      .getByData(`make-up-time-start-time-input`)
      .clear()
      .type(`17:00`)
    
    cy
      .getByData(`make-up-time-end-time-input`)
      .clear()
      .type(`18:00`)

    cy
      .contains(`Add`)
      .click()
  }
}