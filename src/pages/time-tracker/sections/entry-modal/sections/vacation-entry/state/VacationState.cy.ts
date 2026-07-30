import { EMPTY_VACATION_ENTRY, VacationEntryState } from "./VacationState"

describe(`VacationEntryState`, () => {
  describe(`Initialization Data`, initializationTests)
  describe(`Change IsUnpaid`, changeIsUnpaidTests)
})

function initializationTests() {
  it(`
  GIVEN a new vacationEntryState
  WHEN initialize
  SHOULD have default values
  `, () => {
    const vacationEntryState = new VacationEntryState()

    expect(vacationEntryState.vacationEntry)
      .to
      .deep
      .eq(EMPTY_VACATION_ENTRY) 
  })
}

function changeIsUnpaidTests() {
  it(`
  GIVEN a new vacationEntryState with isUnpaid = false
  WHEN updateVacationEntry is called with isUnpaid = true
  SHOULD change isUnpaid to true
  `, () => {
    const vacationEntryState = new VacationEntryState()

    expect(vacationEntryState.vacationEntry.isUnpaid)
      .to
      .be
      .false

    vacationEntryState.updateVacationEntry({
      vacationEntry: {
        isUnpaid: true,
      },
    })

    expect(vacationEntryState.vacationEntry.isUnpaid)
      .to
      .be
      .true
  })
}
