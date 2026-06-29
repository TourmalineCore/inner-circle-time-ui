import { TrackingPageActions } from "../../../../../../../cypress/pagesActions/TrackingPageActions"
import { AwayWithMakeUpTimeEntryData } from "../../../../types"
import { AwayWithMakeUpTimeEntryContent } from "./AwayWithMakeUpTimeEntryContent"
import { AwayWithMakeUpTimeEntryState, getDefaultTimeForMakeUpTime } from "./state/AwayWithMakeUpTimeEntryState"
import { AwayWithMakeUpTimeEntryStateContext } from './state/AwayWithMakeUpTimeEntryStateContext'

describe(`AwayWithMakeUpTimeEntryContent`, () => {   
  describe(`Add Make-up Time`, addMakeUpTimeTests)
  describe(`Remove Make-up Time`, removeMakeUpTimeTests)
  describe(`Display Remove Make-up Time Buttons`, displayRemoveMakeUpTimeButtonsTests)
  describe(`Make-up Time Edit Mode`, makeUpTimeEditModeTests)
})

function addMakeUpTimeTests() {
  it(`
  GIVEN one make-up time
  WHEN click on the add make-up time button
  SHOULD add make-up time to list
  `, () => {
    mountComponent({
      makeUpTimeList: [
        {
          id: 1,
        },
      ],
    })

    cy
      .getByData(`make-up-time`)
      .should(`have.length`, 1)
      
    cy
      .getByData(`add-make-up-time-button`)
      .click()

    cy
      .get(`@addMakeUpTime`)
      .should(`have.been.calledOnce`)

    cy
      .getByData(`make-up-time`)
      .should(`have.length`, 2)
      
    cy
      .get<AwayWithMakeUpTimeEntryState>(`@awayWithMakeUpTimeEntryState`)
      .should((awayWithMakeUpTimeEntryState) => {
        expect(awayWithMakeUpTimeEntryState.awayWithMakeUpTimeEntryData.makeUpTimeList)
          .to
          .deep
          .eq([
            {
              id: 1,
            },
            {
              id: 2,
              date: null,
              startTime: getDefaultTimeForMakeUpTime(),
              endTime: getDefaultTimeForMakeUpTime(),
            },
          ])
      })
  })
}

function removeMakeUpTimeTests() {
  it(`
  GIVEN two make-up time
  WHEN click on the 1st remove make-up time button
  SHOULD remove its make-up time from list
  `, () => {
    mountComponent({
      makeUpTimeList: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    })

    cy
      .getByData(`make-up-time`)
      .should(`have.length`, 2)
      
    cy
      .getByData(`remove-make-up-time-button`)
      .first()
      .click()

    cy
      .get(`@removeMakeUpTime`)
      .should(`have.been.calledOnceWith`, {
        makeUpTimeId: 1,
      })

    cy
      .getByData(`make-up-time`)
      .should(`have.length`, 1)
  })
}

function displayRemoveMakeUpTimeButtonsTests() {
  it(`
  GIVEN one make-up time
  WHEN render the component
  SHOULD not render remove make-up time buttons
  `, () => {
    mountComponent({
      makeUpTimeList: [
        {
          id: 1,
        },
      ],
    })
      
    cy
      .getByData(`remove-make-up-time-button`)
      .should(`not.exist`)
  })

  it(`
  GIVEN more than one make-up time
  WHEN render the component
  SHOULD render remove make-up time buttons
  `, () => {
    mountComponent({
      makeUpTimeList: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    })
      
    cy
      .getByData(`remove-make-up-time-button`)
      .should(`have.length`, 2)
  })
}

function makeUpTimeEditModeTests() {
  it(`
  GIVEN make-up time entry opened
  WHEN render the component
  SHOULD disable away fields but the make-up fields not disabled
  `, () => {
    mountComponent({
      isMakeUpTimeEditMode: true,
    })
      
    TrackingPageActions.getEntryModalDescriptionInput()
      .should(`be.disabled`)
    
    cy
      .getByData(`away-datepicker`)
      .find(`input`)
      .should(`be.disabled`)
      
    TrackingPageActions.getEntryModalStartTimeInput()
      .should(`be.disabled`)

    TrackingPageActions.getEntryModalEndTimeInput()
      .should(`be.disabled`)

    cy
      .getByData(`make-up-time-datepicker`)
      .find(`input`)
      .should(`not.be.disabled`)
      
    TrackingPageActions.getEntryModalMakeUpStartTimeInput()
      .should(`not.be.disabled`)  

    TrackingPageActions.getEntryModalMakeUpEndTimeInput()
      .should(`not.be.disabled`)
  })

  it(`
  GIVEN away with make-up time entry opened
  WHEN render the component
  SHOULD not disable away fields
  `, () => {
    mountComponent()

    TrackingPageActions.getEntryModalDescriptionInput()
      .should(`not.be.disabled`)
    
    cy
      .getByData(`away-datepicker`)
      .find(`input`)
      .should(`not.be.disabled`)
      
    TrackingPageActions.getEntryModalStartTimeInput()
      .should(`not.be.disabled`)

    TrackingPageActions.getEntryModalEndTimeInput()
      .should(`not.be.disabled`)
  })
}

function mountComponent({
  makeUpTimeList = [],
  isMakeUpTimeEditMode = false,
}: {
  makeUpTimeList?: unknown[],
  isMakeUpTimeEditMode?: boolean,
} = {}) {
  const awayWithMakeUpTimeEntryState = new AwayWithMakeUpTimeEntryState()

  cy
    .wrap(awayWithMakeUpTimeEntryState)
    .as(`awayWithMakeUpTimeEntryState`)
    
  cy.spy(awayWithMakeUpTimeEntryState, `removeMakeUpTime`)
    .as(`removeMakeUpTime`)

  cy.spy(awayWithMakeUpTimeEntryState, `addMakeUpTime`)
    .as(`addMakeUpTime`)
  
  awayWithMakeUpTimeEntryState.initialize({
    awayWithMakeUpTimeEntry: {
      makeUpTimeList,
    } as AwayWithMakeUpTimeEntryData,
  })

  cy
    .mount(
      <AwayWithMakeUpTimeEntryStateContext.Provider value={awayWithMakeUpTimeEntryState}>
        <AwayWithMakeUpTimeEntryContent isMakeUpTimeEditMode={isMakeUpTimeEditMode} />
      </AwayWithMakeUpTimeEntryStateContext.Provider>,
    )
}