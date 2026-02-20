export class TimeTrackerPage {
  static visit() {
    cy.visit(`/time/tracking`)
  }

  static addTaskEntry() {
    cy.get(`.rbc-day-slot`)
      .find(`.rbc-timeslot-group`)
      .first()
      .find(`.rbc-time-slot`)
      .first()
      .click({
        force: true, 
      })

    cy
      .getByData(`title-input`)
      .clear()
      .type(`[E2E-SMOKE] Task 1`)

    cy
      .getByData(`task-id-input`)
      .clear()
      .type(`#test`)

    cy
      .getByData(`project-select`)
      .select(1)

    cy
      .getByData(`description-input`)
      .clear()
      .type(`Task description`)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`11:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`15:00`)

    cy
      .contains(`Add Task`)
      .click()
  }

  static updateTaskEntry() {
    cy
      .contains(`[E2E-SMOKE] Task 1`)
      .click()

    cy
      .getByData(`title-input`)
      .clear()
      .type(`[E2E-SMOKE] Task 2`)

    cy
      .getByData(`project-select`)
      .select(2)

    cy
      .getByData(`task-id-input`)
      .clear()
      .type(`#test2`)

    cy
      .getByData(`description-input`)
      .clear()
      .type(`Task 2 description`)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`13:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`17:00`)

    cy
      .contains(`Update Task`)
      .click()
  }

  static checkTaskEntryAfterUpdate() {
    cy
      .contains(`[E2E-SMOKE] Task 2`)
      .click()

    cy
      .getByData(`task-id-input`)
      .should(`have.value`, `#test2`)

    cy
      .getByData(`description-input`)
      .should(`have.value`, `Task 2 description`)

    cy
      .getByData(`start-time-input`)
      .should(`have.value`, `13:00`)
    
    cy
      .getByData(`end-time-input`)
      .should(`have.value`, `17:00`)
  }

  static addUnwellEntry() {
    cy.get(`.rbc-day-slot`)
      .find(`.rbc-timeslot-group`)
      .first()
      .find(`.rbc-time-slot`)
      .first()
      .click({
        force: true, 
      })

    cy
      .getByData(`type-select`)
      .select(1)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`04:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`05:00`)

    cy
      .contains(`Add`)
      .click()
  }

  static updateUnwellEntry() {
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

  static checkUnwellEntryAfterUpdate() {
    cy.contains(`6:00 - 7:00`)
      .should(`not.exist`)

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
