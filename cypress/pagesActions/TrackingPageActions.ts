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
      // Sometimes, for some reason, clicking on a slot does not work with a single click but double click works stably.
      .dblclick({
        force: true, 
      })
  }

  static getEntryModalStartTimeInput() {
    return cy.getByData(`start-time-input`)
  }

  static getEntryModalEndTimeInput() {
    return cy.getByData(`end-time-input`)
  }

  static getEntryModalTitleInput() {
    return cy.getByData(`title-input`)
  }

  static getEntryModalProjectSelect() {
    return cy.getByData(`project-select`)
  }

  static getEntryModalTaskIdInput() {
    return cy.getByData(`task-id-input`)
  }

  static getEntryModalDescriptionInput() {
    return cy.getByData(`description-input`)
  }

  static getCopyAlert() {
    return cy.getByData(`copy-alert`)
  }

  static getEntryModalCopyButton() {
    return cy.getByData(`copy-button`)
  }

  static getEntryModalDeleteButton() {
    return cy.getByData(`delete-button`)
  }

  static getEntryModalTypeSelect() {
    return cy.getByData(`entry-type-select`)
  }
  
  static getEntryModalMakeUpStartTimeInput() {
    return cy.getByData(`make-up-time-start-time-input`)
  }

  static getEntryModalMakeUpEndTimeInput() {
    return cy.getByData(`make-up-time-end-time-input`)
  } 
  
  static getEntryModalStartDateDatepicker() {
    return cy
      .getByData(`start-date-datepicker`)
      .find(`input`)
  }

  static getEntryModalEndDateDatepicker() {
    return cy
      .getByData(`end-date-datepicker`)
      .find(`input`)
  }

  static getAllDayEntryButton() {
    return cy.getByData(`all-day-entry-button`)
  }

  static selectEntryModalType({
    entryType,
  }: {
    entryType: EntryType,
  }) {
    return this.getEntryModalTypeSelect()
      .select(entryType.toString())
  }

  static clickByEntryModalSubmitButton() {
    return cy
      .getByData(`submit-button`)
      .click()
  }

  static clickByEntryModalCloseButton() {
    return cy
      .get(`.tc-modal__close-button`)
      .click()
  }

  static getAllDayButton() {
    return cy.getByData(`all-day-entry-button`)
  }

  static getSickLeave() {
    return cy.getByData(`sick-leave`)
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

    this.selectEntryModalType({
      entryType: EntryType.TASK,
    })
      
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