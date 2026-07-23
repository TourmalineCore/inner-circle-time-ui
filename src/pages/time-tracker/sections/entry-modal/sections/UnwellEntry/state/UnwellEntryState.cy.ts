import { UnwellEntryData } from "../../../../../types"
import { EMPTY_UNWELL_ENTRY_DATA, UnwellEntryState } from "./UnwellEntryState"

describe(`UnwellEntryState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Initialization Data`, initializationTests)
})

function initialTests() {
  it(`
  GIVEN a new UnwellEntryState
  WHEN initialize
  SHOULD have default values
  `, () => {
    const unwellEntryState = new UnwellEntryState()

    expect(unwellEntryState.unwellEntryData)
      .to
      .deep
      .eq(EMPTY_UNWELL_ENTRY_DATA) 
  })
}

function initializationTests() {
  it(`
  GIVEN a new UnwellEntryState
  WHEN initializeEntry called with partial data (only date, start, end) as if the user is creating a new unwell entry
  SHOULD return unwellEntryData with recieved data but the remaining fields must be default
  `, () => {
    const newDate = new Date()

    const unwellEntryForInitialization = {
      date: newDate,
      start: newDate,
      end: newDate,
    }

    const {
      unwellEntryState,
    } = createState({
      unwellEntryForInitialization,
    })

    expect(unwellEntryState.unwellEntryData)
      .to
      .deep
      .eq({
        ...EMPTY_UNWELL_ENTRY_DATA,
        ...unwellEntryForInitialization,
      }) 
  })

  it(`
  GIVEN a new UnwellEntryState
  WHEN initializeEntry called as if the user open existing unwell entry
  SHOULD return unwellEntryData with the received data
  `, () => {
    const newDate = new Date()

    const unwellEntryForInitialization = {
      id: 1,
      date: newDate,
      start: newDate,
      end: newDate,
    }

    const {
      unwellEntryState,
    } = createState({
      unwellEntryForInitialization,
    })
    
    expect(unwellEntryState.unwellEntryData)
      .to
      .deep
      .eq(unwellEntryForInitialization) 
  })
}

function createState({
  unwellEntryForInitialization,
}: {
  unwellEntryForInitialization: unknown,
} = {
  unwellEntryForInitialization: {},
}) {
  const unwellEntryState = new UnwellEntryState()

  unwellEntryState.initializeEntry({
    unwellEntry: unwellEntryForInitialization as UnwellEntryData,
  })

  return {
    unwellEntryState,
  }
}
