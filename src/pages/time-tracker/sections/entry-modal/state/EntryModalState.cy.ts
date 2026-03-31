import { EntryType } from "../../../../../common/constants/entryType"
import { EntryModalState } from "./EntryModalState"

describe(`EntryModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
  describe(`Set Error`, setErrorTests)
  describe(`Copy Current Entry`, copyCurrentEntryTests)
  describe(`Reset Is Copy Mode`, resetIsCopyModeTests)
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

    expect(entryModalState.currentEntry)
      .to
      .eq(null)

    expect(entryModalState.isCopyMode)
      .to
      .eq(false)

    expect(entryModalState.isOpenModal)
      .to
      .eq(false)
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

function copyCurrentEntryTests() {
  let entryModalState: EntryModalState

  const testCurrentEntry = {
    id: 1,
    title: `Test Entry`,
    taskId: `Test TaskId`,
    date: new Date(2026, 3, 11),
    start: new Date(2026, 3, 11),
    end: new Date(2026, 3, 11),
  }

  beforeEach(() => {
    entryModalState = new EntryModalState()

    entryModalState.openEntry({
      entry: testCurrentEntry,
    })
  })

  it(`
  GIVEN a state with filled current entry
  WHEN copy current entry
  SHOULD copy current entry without Id
  AND SHOULD set isCopyMode to true
  `, () => {
    expect(entryModalState.isCopyMode).false

    entryModalState.copyCurrentEntry()

    expect(entryModalState.currentEntry)
      .to
      .deep
      .eq({
        ...testCurrentEntry,
        id: undefined,
      })

    expect(entryModalState.isCopyMode).true
  })
}

function resetIsCopyModeTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()

    entryModalState.copyCurrentEntry()
  })

  it(`
  GIVEN a state with isCopyMode equal true
  WHEN reset isCopyMode
  SHOULD return isCopyMode equal to false
  `, () => {
    expect(entryModalState.isCopyMode).true

    entryModalState.resetIsCopyMode()

    expect(entryModalState.isCopyMode).false
  })
}
