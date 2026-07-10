import { SickLeaveEntry } from "../../../../../types"
import { EMPTY_SICK_LEAVE_ENTRY, SickLeaveEntryState } from "./SickLeaveState"

describe(`SickLeaveEntryState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Initialization Data`, initializationTests)
})

function initialTests() {
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

function initializationTests() {
  it(`
  GIVEN a new SickLeaveEntryState
  WHEN initializeEntry called
  SHOULD return sickLeaveEntry with the received data
  `, () => {
    const newDate = new Date()

    const sickLeaveEntryForInitialization = {
      id: 1,
      period: {
        startDate: newDate,
        endDate: newDate,
      },
    }

    const {
      sickLeaveEntryState,
    } = createState({
      sickLeaveEntryForInitialization,
    })
    
    expect(sickLeaveEntryState.sickLeaveEntry)
      .to
      .deep
      .eq(sickLeaveEntryForInitialization) 
  })
}

function createState({
  sickLeaveEntryForInitialization,
}: {
  sickLeaveEntryForInitialization: unknown,
} = {
  sickLeaveEntryForInitialization: {},
}) {
  const sickLeaveEntryState = new SickLeaveEntryState()

  sickLeaveEntryState.initializeEntry({
    sickLeaveEntry: sickLeaveEntryForInitialization as SickLeaveEntry,
  })

  return {
    sickLeaveEntryState,
  }
}
