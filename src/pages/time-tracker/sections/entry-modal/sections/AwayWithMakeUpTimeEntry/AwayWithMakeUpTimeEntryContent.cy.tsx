import { TrackingPageActions } from "../../../../../../../cypress/pagesActions/TrackingPageActions"
import { AwayWithMakeUpTimeEntryData } from "../../../../types"
import { AwayWithMakeUpTimeEntryContent } from "./AwayWithMakeUpTimeEntryContent"
import { AwayWithMakeUpTimeEntryState, getDefaultTimeForMakeUpTime } from "./state/AwayWithMakeUpTimeEntryState"
import { AwayWithMakeUpTimeEntryStateContext } from './state/AwayWithMakeUpTimeEntryStateContext'

describe(`AwayWithMakeUpTimeEntryContent`, () => {   
  describe(`Add Make Up`, addMakeUpTests)
  describe(`Remove Make Up`, removeMakeUpTests)
  describe(`Display Remove Make Up Buttons`, displayRemoveMakeUpButtonsTests)
  describe(`Make Up Mode`, makeUpModeTests)
})

function addMakeUpTests() {
  it(`
  GIVEN one make up 
  WHEN click on the add make up button
  SHOULD add make up to list
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

function removeMakeUpTests() {
  it(`
  GIVEN two make up 
  WHEN click on the 1th remove make up button
  SHOULD remove its make up from list
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
      
    cy
      .get<AwayWithMakeUpTimeEntryState>(`@awayWithMakeUpTimeEntryState`)
      .should((awayWithMakeUpTimeEntryState) => {
        expect(awayWithMakeUpTimeEntryState.awayWithMakeUpTimeEntryData.makeUpTimeList)
          .to
          .deep
          .eq([
            {
              id: 2,
            },
          ])
      })
  })
}

function displayRemoveMakeUpButtonsTests() {
  it(`
  GIVEN one make up 
  WHEN render the component
  SHOULD not render remove make up buttons
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
  GIVEN more than one make up
  WHEN render the component
  SHOULD render remove make up buttons
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

function makeUpModeTests() {
  it(`
  GIVEN make up mode enabled
  WHEN render the component
  SHOULD disable away fields but the make-up fields not disabled
  `, () => {
    mountComponent({
      makeUpTimeList: [],
      isMakeUpMode: true,
    })
      
    TrackingPageActions.getEntryModalDescriptionInput()
      .should(`be.disabled`)
    
    cy.getByData(`away-datepicker`)
      .find(`input`)
      .should(`be.disabled`)
      
    TrackingPageActions.getEntryModalStartTimeInput()
      .should(`be.disabled`)

    TrackingPageActions.getEntryModalEndTimeInput()
      .should(`be.disabled`)

    cy.getByData(`make-up-time-datepicker`)
      .find(`input`)
      .should(`not.be.disabled`)
      
    TrackingPageActions.getEntryModalMakeUpStartTimeSelect()
      .should(`not.be.disabled`)  

    TrackingPageActions.getEntryModalMakeUpStartTimeSelect()
      .should(`not.be.disabled`)
  })

  it(`
  GIVEN make up mode disabled
  WHEN render the component
  SHOULD not disable away and make-up fields
  `, () => {
    mountComponent()

    TrackingPageActions.getEntryModalDescriptionInput()
      .should(`not.be.disabled`)
    
    cy.getByData(`away-datepicker`)
      .find(`input`)
      .should(`not.be.disabled`)
      
    TrackingPageActions.getEntryModalStartTimeInput()
      .should(`not.be.disabled`)

    TrackingPageActions.getEntryModalEndTimeInput()
      .should(`not.be.disabled`)

    TrackingPageActions.getEntryModalMakeUpStartTimeSelect()
      .should(`not.be.disabled`)

    TrackingPageActions.getEntryModalMakeUpEndTimeSelect()
      .should(`not.be.disabled`)
  })
}

function mountComponent({
  makeUpTimeList = [],
  isMakeUpMode = false,
}: {
  makeUpTimeList?: unknown[],
  isMakeUpMode?: boolean,
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
        <AwayWithMakeUpTimeEntryContent isMakeUpMode={isMakeUpMode} />
      </AwayWithMakeUpTimeEntryStateContext.Provider>,
    )
}