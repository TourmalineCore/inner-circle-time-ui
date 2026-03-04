const TITLE = `[E2E-SMOKE] Task 1`
const TASK_ID = `#test`
const DESCRIPTION = `Task description`

export class TaskEntry {
  static fill() {
    cy
      .getByData(`title-input`)
      .clear()
      .type(TITLE)

    cy
      .getByData(`task-id-input`)
      .clear()
      .type(TASK_ID)

    cy
      .getByData(`project-select`)
      .select(1)

    cy
      .getByData(`description-input`)
      .clear()
      .type(DESCRIPTION)

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

  static update() {
    cy
      .contains(TITLE)
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

  static copy() {
    cy
      .contains(TITLE)
      .click()

    cy
      .getByData(`copy-button`)
      .click()
  }

  static checkAfterCopy() { 
    cy.getByData(`copy-alert`)
      .should(`exist`)
     
    cy
      .getByData(`title-input`)
      .should(`have.value`, TITLE)

    cy
      .getByData(`project-select`)
      .should(`have.value`, 2)

    cy
      .getByData(`task-id-input`)
      .should(`have.value`, TASK_ID)

    cy
      .getByData(`description-input`)
      .should(`have.value`, DESCRIPTION)

    cy
      .getByData(`start-time-input`)
      .clear()
      .type(`00:00`)
    
    cy
      .getByData(`end-time-input`)
      .clear()
      .type(`00:15`)

    cy
      .get(`.tc-modal__close-button`)
      .click()

    cy.getByData(`copy-alert`)
      .should(`not.exist`)
  }

  static checkAfterUpdate() {
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
}