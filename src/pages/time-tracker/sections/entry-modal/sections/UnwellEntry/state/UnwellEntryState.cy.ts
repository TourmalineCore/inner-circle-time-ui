import { EMPTY_UNWELL_ENTRY_DATA, UnwellEntryState } from "./UnwellEntryState"

describe(`UnwellEntryState`, () => {
  describe(`Initial Data`, initialTests)
})

function initialTests() {
  let unwellEntryState: UnwellEntryState

  beforeEach(() => {
    unwellEntryState = new UnwellEntryState()
  })

  it(`
  GIVEN a new UnwellEntryState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(unwellEntryState.unwellEntryData)
      .to
      .deep
      .eq(EMPTY_UNWELL_ENTRY_DATA) 
  })
}
