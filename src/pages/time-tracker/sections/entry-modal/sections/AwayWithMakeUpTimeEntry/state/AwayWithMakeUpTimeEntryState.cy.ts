import { AwayWithMakeUpTimeEntryData } from "../../../../../types"
import { AwayWithMakeUpTimeEntryState, EMPTY_AWAY_WITH_MAKE_UP_TIME_ENTRY_DATA, getDefaultTimeForMakeUpTime } from "./AwayWithMakeUpTimeEntryState"

describe(`AwayWithMakeUpTimeEntryState`, () => {
  describe(`Initialization Data`, initializationTests)
  describe(`Validation`, validationTests)
  describe(`Try To Submit`, tryToSubmitTests)
})

function initializationTests() {
  it(`
  GIVEN a new AwayWithMakeUpTimeEntryState
  WHEN initialize new away with make-up time entry
  SHOULD return initialize new away with make-up time entry
  `, () => {
    const newDate = new Date()

    const awayWithMakeUpTimeEntryState = new AwayWithMakeUpTimeEntryState()

    awayWithMakeUpTimeEntryState.initializeNewEntry({
      startTime: newDate,
      endTime: newDate,
    })

    expect(awayWithMakeUpTimeEntryState.awayWithMakeUpTimeEntryData)
      .to
      .deep
      .eq({
        ...EMPTY_AWAY_WITH_MAKE_UP_TIME_ENTRY_DATA,
        date: newDate,
        start: newDate,
        end: newDate,
        makeUpTimeList: [
          {
            id: 1,
            date: null,
            startTime: getDefaultTimeForMakeUpTime(),
            endTime: getDefaultTimeForMakeUpTime(),
          },
        ],
      }) 
  })

  it(`
  GIVEN a new AwayWithMakeUpTimeEntryState
  WHEN initialize existing away with make-up time entry
  SHOULD return awayWithMakeUpTimeEntryData with the received data
  `, () => {
    const newDate = new Date()

    const awayWithMakeUpTimeEntryForInitialization = {
      date: newDate,
      start: newDate,
      end: newDate,
      description: `Description`,
      makeUpTimeList: [
        {
          id: 2,
          date: newDate,
          startTime: newDate,
          endTime: newDate,
        },
      ],
    }

    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization,
    })

    expect(awayWithMakeUpTimeEntryState.awayWithMakeUpTimeEntryData)
      .to
      .deep
      .eq(awayWithMakeUpTimeEntryForInitialization) 
  })
}

function validationTests() {  
  it(`
  GIVEN initial state with empty description
  AND one make-up time with not empty date
  WHEN isValid is activated
  SHOULD return false
  `, () => {
    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization: {
        description: ``,
        makeUpTimeList: [
          {
            date: new Date(),
          },
        ],
      },
    })

    expect(awayWithMakeUpTimeEntryState.isValid)
      .to
      .be
      .false
  })

  it(`
  GIVEN initial state with not empty description 
  AND two make-up time
  AND one of them has an empty date. 
  WHEN isValid is activated
  SHOULD return false
  `, () => {
    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization: {
        description: `Description`,
        makeUpTimeList: [
          {
            date: null,
          },
          {
            date: new Date(),
          },
        ],
      },
    })

    expect(awayWithMakeUpTimeEntryState.isValid)
      .to
      .be
      .false
  })

  it(`
  GIVEN initial state with not empty description
  AND two make-up time with not empty date
  WHEN isValid is activated
  SHOULD return true
  `, () => {
    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization: {
        description: `Description`,
        makeUpTimeList: [
          {
            date: new Date(),
          },
          {
            date: new Date(),
          },
        ],
      },
    })

    expect(awayWithMakeUpTimeEntryState.isValid)
      .to
      .be
      .true
  })

  it(`
  GIVEN initial state with empty description
  WHEN try to submit
  SHOULD return isDescriptionError true
  `, () => {
    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization: {
        description: ``,
        makeUpTimeList: [],
      },
    })
  
    awayWithMakeUpTimeEntryState.setIsTriedToSubmit()

    expect(awayWithMakeUpTimeEntryState.isDescriptionError)
      .to
      .be
      .true
  })

  it(`
  GIVEN initial state with not empty description
  WHEN try to submit
  SHOULD return isDescriptionError false
  `, () => {
    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization: {
        description: `Description`,
        makeUpTimeList: [],
      },
    })
  
    awayWithMakeUpTimeEntryState.setIsTriedToSubmit()

    expect(awayWithMakeUpTimeEntryState.isDescriptionError)
      .to
      .be
      .false
  })

  it(`
  GIVEN initial state with two make-up time
  AND one of them has an empty date
  WHEN trigger isMakeUpTimeDateError()
  SHOULD return false for make-up with not empty date
  AND return true for make-up with empty date
  `, () => {
    const {
      awayWithMakeUpTimeEntryState,
    } = createState({
      awayWithMakeUpTimeEntryForInitialization: {
        makeUpTimeList: [
          {
            id: 1,
            date: null,
          },
          {
            id: 2,
            date: new Date(),
          },
        ],
      },
    })

    awayWithMakeUpTimeEntryState.setIsTriedToSubmit()
  
    expect(awayWithMakeUpTimeEntryState.isMakeUpTimeDateError({
      makeUpTimeId: 1,
    }))
      .to
      .be
      .true

    expect(awayWithMakeUpTimeEntryState.isMakeUpTimeDateError({
      makeUpTimeId: 2,
    }))
      .to
      .be
      .false
  })
}

function tryToSubmitTests() {
  const {
    awayWithMakeUpTimeEntryState,
  } = createState()

  it(`
  GIVEN initial state with default isTriedToSubmit value
  WHEN trigger setIsTriedToSubmit()
  SHOULD change value to true
  `, () => {
    expect(awayWithMakeUpTimeEntryState.isTriedToSubmit)
      .to
      .be
      .false

    awayWithMakeUpTimeEntryState.setIsTriedToSubmit()
    expect(awayWithMakeUpTimeEntryState.isTriedToSubmit)
      .to
      .be
      .true
  })
}

function createState({
  awayWithMakeUpTimeEntryForInitialization,
}: {
  awayWithMakeUpTimeEntryForInitialization: unknown,
} = {
  awayWithMakeUpTimeEntryForInitialization: {
    makeUpTimeList: [],
  },
}) {
  const awayWithMakeUpTimeEntryState = new AwayWithMakeUpTimeEntryState()

  awayWithMakeUpTimeEntryState.initializeExistingEntry({
    awayWithMakeUpTimeEntry: awayWithMakeUpTimeEntryForInitialization as AwayWithMakeUpTimeEntryData,
  })

  return {
    awayWithMakeUpTimeEntryState,
  }
}
