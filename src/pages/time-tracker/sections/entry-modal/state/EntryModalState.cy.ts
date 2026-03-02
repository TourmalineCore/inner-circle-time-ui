import { EntryType } from "../../../../../common/constants/entryType"
import { EntryModalState } from "./EntryModalState"

describe(`EntryModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
  describe(`Set Error`, setErrorTests)
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
    
    expect(entryModalState.error)
      .to
      .eq(``)
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

function setErrorTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()
  })
  
  it(`
  GIVEN initial error is empty
  WHEN call setError() with error message
  SHOULD set this error message
  WHEN trigger resetError()
  SHOULD reset to initial value
  `, () => {
    entryModalState.setError({
      error: `Fill in all the fields`,
    })

    expect(entryModalState.error)
      .to
      .eq(`Fill in all the fields`)

    entryModalState.resetError()

    expect(entryModalState.error)
      .to
      .eq(``)
  })
}
