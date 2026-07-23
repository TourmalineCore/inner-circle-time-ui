import { EntryType } from "../../../../../../common/constants/entryType"
import { DayHeader } from "./DayHeader"

describe(`WeekHeader`, () => {
  describe(`Button Text`, buttonTextTests)
  describe(`Label visibility`, labelVisibilityTests)
})

function buttonTextTests() {
  it(`
  GIVEN no all day entries
  WHEN render the component
  THEN render button with "Add an all-day event" text
  `, () => {
    mountComponent({
      allDayEntries: [],
      date: new Date(`2026-07-08`),
    })

    cy.contains(`Add an all-day event`)
  })

  it(`
  GIVEN a sick leave entry spans across the current day
  WHEN render the component
  THEN render button with "Sick leave" text
  `, () => {
    mountComponent({
      allDayEntries: [
        {
          start: new Date(`2026-07-07T00:00:00`),
          end: new Date(`2026-07-08T23:59:00`),
          type: EntryType.SICK_LEAVE, 
        },
      ],
      date: new Date(`2026-07-08`),
    })

    cy.contains(`Sick leave`)
  })

  it(`
  GIVEN a sick leave entry exists but on a different day
  WHEN render the component
  THEN render button with "Sick leave" text
  `, () => {
    mountComponent({
      allDayEntries: [
        {
          start: new Date(`2026-07-07T00:00:00`),
          end: new Date(`2026-07-07T23:59:00`),
          type: EntryType.SICK_LEAVE, 
        },
      ],
      date: new Date(`2026-07-08`),
    })

    cy.contains(`Add an all-day event`)
  })
}

function labelVisibilityTests() {
  it(`
  GIVEN day header component
  AND showLabel = true
  WHEN render the component
  THEN label is displayed
  `, () => {
    mountComponent({
      allDayEntries: [],
      date: new Date(`2026-07-08`),
    })
    
    cy.getByData(`day-header-label`)
      .should(`exist`)
  })

  it(`
  GIVEN day header component
  AND showLabel = false
  WHEN render the component
  THEN label is not displayed
  `, () => {
    mountComponent({
      allDayEntries: [],
      date: new Date(`2026-07-08`),
      showLabel: false,
    })

    cy.getByData(`day-header-label`)
      .should(`not.exist`)
  })
}

function mountComponent({
  allDayEntries,
  date,
  showLabel = true,
}: {
  allDayEntries: any[],
  date: Date,
  showLabel?: boolean,
}) {
  cy.viewport(1366, 768)
    
  cy
    .mount(
      <DayHeader
        allDayEntries={allDayEntries}
        date={date}
        label={``}
        openEntry={() => {}}
        createNewAllDayEntry={() => {}}
        showLabel={showLabel}
      />,
    )
}
