import { EMPTY_SICK_LEAVE_ENTRY, SickLeaveEntryState } from "./SickLeaveState"

describe(`SickLeaveEntryState`, () => {
  describe(`Initialization Data`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN a new SickLeaveEntryState
  WHEN initialize
  SHOULD have default values
  `, () => {
    const sickLeaveEntryState = new SickLeaveEntryState()

    expect(sickLeaveEntryState.sickLeaveEntry)
      .to
      .deep
      .eq(EMPTY_SICK_LEAVE_ENTRY) 
  })
}
