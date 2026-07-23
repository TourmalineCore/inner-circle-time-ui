import { TrackingPageActions } from "../../../../../cypress/pagesActions/TrackingPageActions"
import { TimeTrackerTableState } from "./state/TimeTrackerTableState"
import { TimeTrackerStateContext } from "./state/TimeTrackerTableStateContext"
import { TimeTrackerTableContent } from "./TimeTrackerTableContent"

describe(`TimeTrackerTableContent`, () => {
  beforeEach(() => {
    // set cypress default date
    cy.clock(new Date(2025, 10, 27), [
      `Date`,
    ])
  })

  describe(`Copy Mode`, copyModeTests)
})

function copyModeTests() {
  it(`
  GIVEN time tracker table
  WHEN isCopyMode equal false
  SHOULD not see copy alert
  `, () => {
    mountComponent()

    TrackingPageActions
      .getCopyAlert()
      .should(`not.exist`)
  })
  
  it(`
  GIVEN time tracker table
  WHEN isCopyMode equal true
  SHOULD see copy alert
  `, () => {
    mountComponent({
      isCopyMode: true,
    })

    TrackingPageActions
      .getCopyAlert()
      .should(`exist`)
  }) 
}

function mountComponent({
  isCopyMode = false,
}: {
  isCopyMode?: boolean,
} = {}) {
  cy.viewport(1366, 768)
      
  const timeTrackerState = new TimeTrackerTableState()
    
  cy
    .mount(
      <TimeTrackerStateContext.Provider value={timeTrackerState}>
        <TimeTrackerTableContent
          isCopyMode={isCopyMode}
          createCopyEntry={() => {}}
          createNewEntry={() => {}}
          openEntry={() => {}}
          resetIsCopyMode={() => {}}
        />
      </TimeTrackerStateContext.Provider>,
    )
}
