import { ALL_DAY_ENTRY_TYPES, CAN_OVERLAP_SICK_LEAVE, EntryType, NON_ALL_DAY_ENTRY_TYPES, TYPE_LABELS } from "../../../../../common/constants/entryType"
import { TrackedEntry } from "../../../types"
import { EntryModalState } from "./EntryModalState"

describe(`EntryModalState`, () => {
  describe(`Initial Data`, initialTests)
  describe(`Setters Data`, settersTests)
  describe(`Create New Non All Day Entry`, createNewNonAllDayEntryTests)
  describe(`Create New All Day Entry`, createNewAllDayEntryTests)
  describe(`Open Entry`, openEntryTests)
  describe(`Error`, errorTests)
  describe(`Copy Current Entry`, copyCurrentEntryTests)
  describe(`Is Copy Mode`, isCopyModeTests)
  describe(`Is Open Modal`, isOpenModalTests)
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

function createNewNonAllDayEntryTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()
  })

  it(`
  GIVEN a state with empty available entry types
  WHEN createNewNonAllDayEntry is called without background entry type
  SHOULD set available types containing only non-all-day entry types
  `, () => {
    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq([])
      
    entryModalState.createNewNonAllDayEntry({
      start: new Date(),
      end: new Date(),
    })

    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq(NON_ALL_DAY_ENTRY_TYPES)

    expect(entryModalState.type)
      .to
      .eq(NON_ALL_DAY_ENTRY_TYPES[0].value)
  })

  it(`
  GIVEN a state with empty available entry types
  WHEN createNewNonAllDayEntry is called with sick leave background entry type
  SHOULD set available types that can overlap with sick leave
  `, () => {
    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq([])
      
    entryModalState.createNewNonAllDayEntry({
      backgroundEntryType: EntryType.SICK_LEAVE,
      start: new Date(),
      end: new Date(),
    })

    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq(CAN_OVERLAP_SICK_LEAVE)

    expect(entryModalState.type)
      .to
      .eq(CAN_OVERLAP_SICK_LEAVE[0].value)
  })
}

function createNewAllDayEntryTests() {
  it(`
  GIVEN a state with empty available entry types
  WHEN createNewAllDayEntry is called
  SHOULD set available types containing only all-day entry types
  `, () => {
    const entryModalState = new EntryModalState()

    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq([])
      
    entryModalState.createNewAllDayEntry({
      start: new Date(),
      end: new Date(),
    })

    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq(ALL_DAY_ENTRY_TYPES)

    expect(entryModalState.type)
      .to
      .eq(ALL_DAY_ENTRY_TYPES[0].value)
  })
}

function openEntryTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()
  })

  it(`
  GIVEN a state with empty available entry types
  WHEN openEntry is called with a task entry
  SHOULD set available entry types with only the task type
  AND set isOpenModal to true
  `, () => {
    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq([])

    expect(entryModalState.isOpenModal).false
      
    const taskEntry = {
      id: 1,
      type: EntryType.TASK,
    }
      
    entryModalState.openEntry({
      entry: taskEntry as TrackedEntry, 
    })

    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq([
        {
          value: EntryType.TASK,
          label: TYPE_LABELS[EntryType.TASK],
        },
      ])

    expect(entryModalState.isOpenModal).true
  })

  it(`
  GIVEN a state with empty available entry types
  WHEN openEntry is called with a make-up time entry with related away with make-up time entry 
  SHOULD set available entry types with only the away with make-up time type
`, () => {
    const makeUpTimeEntry = {
      id: 1,
      type: EntryType.MAKE_UP_TIME,
      relatedEntryType: EntryType.AWAY_WITH_MAKE_UP_TIME,
    }
      
    entryModalState.openEntry({
      entry: makeUpTimeEntry as TrackedEntry, 
    })
    
    expect(entryModalState.availableEntryTypes)
      .to
      .deep
      .eq([
        {
          value: EntryType.AWAY_WITH_MAKE_UP_TIME,
          label: TYPE_LABELS[EntryType.AWAY_WITH_MAKE_UP_TIME],
        },
      ])
  })
}

function errorTests() {
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
  WHEN call copyCurrentEntry()
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

function isCopyModeTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()

    entryModalState.copyCurrentEntry()
  })

  it(`
  GIVEN a state with isCopyMode equal true
  WHEN call resetIsCopyMode()
  SHOULD return isCopyMode equal to false
  `, () => {
    expect(entryModalState.isCopyMode).true

    entryModalState.resetIsCopyMode()

    expect(entryModalState.isCopyMode).false
  })
}

function isOpenModalTests() {
  let entryModalState: EntryModalState

  beforeEach(() => {
    entryModalState = new EntryModalState()
  })

  it(`
  GIVEN a state with isOpenModal equal false
  WHEN call openEntryModal()
  SHOULD return isOpenModal equal to true
  AND WHEN call closeEntryModal()
  SHOULD return isOpenModal equal to false
  `, () => {
    expect(entryModalState.isOpenModal).false

    entryModalState.openEntryModal()

    expect(entryModalState.isOpenModal).true

    entryModalState.closeEntryModal()

    expect(entryModalState.isOpenModal).false
  })
}
