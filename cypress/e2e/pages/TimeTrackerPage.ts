export class TimeTrackerPage {
  static visit() {
    cy.visit(`/time`)
  }

  static addWorkEntry() {
    cy
      .get(`.rbc-day-slot `)
      .first()
      .click()

    cy
      .getByData(`title-input`)
      .clear()
      .type(`[E2E-SMOKE] Task 1`)

    cy
      .getByData(`task-id-input`)
      .clear()
      .type(`#test`)

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

  static updateWorkEntry() {
    cy
      .contains(`[E2E-SMOKE] Task 1`)
      .click()

    cy
      .getByData(`title-input`)
      .clear()
      .type(`[E2E-SMOKE] Task 2`)

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

  static checkWorkEntryAfterUpdate() {
    cy
      .contains(`[E2E-SMOKE] Task 2`)
      .click()

    cy
      .getByData(`task-id-input`)
      .should(`have.value`, `#test2`)

    cy
      .getByData(`decsription-input`)
      .should(`have.value`, `Task 2 description`)

    cy
      .getByData(`start-time-input`)
      .should(`have.value`, `13:00`)
    
    cy
      .getByData(`end-time-input`)
      .should(`have.value`, `17:00`)
  }
}
