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
    entryModalState.setType({
      type: EntryType.UNWELL,
    })

    expect(entryModalState.type)
      .to
      .eq(EntryType.UNWELL)
  })
}
