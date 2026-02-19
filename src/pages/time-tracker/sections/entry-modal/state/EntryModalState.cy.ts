import { EntryType } from "../../../../../common/constants/entryType"
import { EntryModalState } from "./EntryModalState"

describe(`EntryModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
})

function initialTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()
  })

  it(`
  GIVEN a new EntryModalState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(entryModalState.type)
      .to
      .deep
      .eq(EntryType.TASK) 
  })
}

function settersTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()
  })

  it(`
  GIVEN a state with default type
  WHEN set type 
  SHOULD return updated type
  `, () => {
    // Todo: change 2 to the value from the enum when new values appear in it
    entryModalState.setType({
      type: 2 as EntryType,
    })

    expect(entryModalState.type)
      .to
      .eq( 2 as EntryType)
  })
}
