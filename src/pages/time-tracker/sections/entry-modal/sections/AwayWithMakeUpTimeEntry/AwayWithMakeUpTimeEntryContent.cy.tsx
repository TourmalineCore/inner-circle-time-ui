import { AwayWithMakeUpTimeEntryData } from "../../../../types"
import { AwayWithMakeUpTimeEntryContent } from "./AwayWithMakeUpTimeEntryContent"
import { AwayWithMakeUpTimeEntryState, getDefaultTimeForMakeUpTime } from "./state/AwayWithMakeUpTimeEntryState"
import { AwayWithMakeUpTimeEntryStateContext } from './state/AwayWithMakeUpTimeEntryStateContext'

describe(`AwayWithMakeUpTimeEntryContent`, () => {   
  describe(`Add Make Up`, addMakeUpTests)
  describe(`Remove Make Up`, removeMakeUpTests)
  describe(`Display Remove Make Up Buttons`, displayRemoveMakeUpButtonsTests)
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
      .getByData(`away-with-make-up-time-entry__make-up`)
      .should(`have.length`, 1)
      
    cy
      .getByData(`add-make-up-button`)
      .click()

    cy
      .get(`@addMakeUpTime`)
      .should(`have.been.calledOnce`)

    cy
      .getByData(`away-with-make-up-time-entry__make-up`)
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
      .getByData(`away-with-make-up-time-entry__make-up`)
      .should(`have.length`, 2)
      
    cy
      .getByData(`remove-make-up-button`)
      .first()
      .click()

    cy
      .get(`@removeMakeUpTime`)
      .should(`have.been.calledOnceWith`, {
        makeUpTimeId: 1,
      })

    cy
      .getByData(`away-with-make-up-time-entry__make-up`)
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
      .getByData(`remove-make-up-button`)
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
      .getByData(`remove-make-up-button`)
      .should(`have.length`, 2)
  })
}

function mountComponent({
  makeUpTimeList,
}: {
  makeUpTimeList: unknown[],
} = {
  makeUpTimeList: [],
}) {
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
        <AwayWithMakeUpTimeEntryContent />
      </AwayWithMakeUpTimeEntryStateContext.Provider>,
    )
}