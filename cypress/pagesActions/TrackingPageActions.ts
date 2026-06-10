import { EntryType } from "../../src/common/constants/entryType"

export class TrackingPageActions {
  static visit() {
    return cy.visit(`/time/tracking`)
  }

  static clickOnFirstTimeSlot() {
    return cy.get(`.rbc-day-slot`)
      .find(`.rbc-timeslot-group`)
      .first()
      .find(`.rbc-time-slot`)
      .first()
      .scrollIntoView()
      .click({
        force: true, 
      })
  }

  static getEntryModalStartTimeInput() {
    return cy.getByData(`entry-modal-start-time-input`)
  }

  static getEntryModalEndTimeInput() {
    return cy.getByData(`entry-modal-end-time-input`)
  }

  static getEntryModalTitleInput() {
    return cy.getByData(`entry-modal-title-input`)
  }

  static getEntryModalProjectSelect() {
    return cy.getByData(`entry-modal-project-select`)
  }

  static getEntryModalTaskIdInput() {
    return cy.getByData(`entry-modal-task-id-input`)
  }

  static getEntryModalDescriptionInput() {
    return cy.getByData(`entry-modal-description-input`)
  }

  static getCopyAlert() {
    return cy.getByData(`copy-alert`)
  }

  static getEntryModalCopyButton() {
    return cy.getByData(`entry-modal-copy-button`)
  }

  static getEntryModalDeleteButton() {
    return cy.getByData(`entry-modal-delete-button`)
  }

  static getEntryModalTypeSelect() {
    return cy.getByData(`entry-modal-type-select`)
  }

  static selectEntryModalType({
    entryType,
  }: {
    entryType: EntryType,
  }) {
    return this.getEntryModalTypeSelect()
    // -1 because the values in select start from 0 but enum values start from 1
      .select(entryType - 1)
  }

  static clickByEntryModalSubmitButton() {
    return cy
      .getByData(`entry-modal-submit-button`)
      .click()
  }

  static clickByEntryModalCloseButton() {
    return cy
      .get(`.tc-modal__close-button`)
      .click()
  }

  static addTaskEntry({
    startTime = `11:00`,
    endTime = `15:00`,
  }: {
    startTime?: string,
    endTime?: string,
  } = {}) { 
    const taskTitle = `[E2E-SMOKE] Task 1`
    const taskId = `#test`
    const taskDescription = `Task description`

    this.clickOnFirstTimeSlot()
      
    this.getEntryModalTitleInput()
      .clear()
      .type(taskTitle)
  
    this.getEntryModalTaskIdInput()
      .clear()
      .type(taskId)
  
    this.getEntryModalProjectSelect()
      .select(1)
  
    this.getEntryModalDescriptionInput()
      .clear()
      .type(taskDescription)
  
    this.getEntryModalStartTimeInput()
      .clear()
      .type(startTime)
      
    this.getEntryModalEndTimeInput()
      .clear()
      .type(endTime)
  
    this.clickByEntryModalSubmitButton()
  
    return {
      taskTitle,
      taskId,
      taskDescription,
    }
  }
}