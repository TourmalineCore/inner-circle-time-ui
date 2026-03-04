export class TimeTrackerPage {
  static visit() {
    cy.visit(`/time/tracking`)
  }

  static clickOnTimeSlot() {
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
}
