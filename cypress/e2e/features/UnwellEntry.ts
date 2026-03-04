export class UnwellEntry {
  static fill() {
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
