import { getEntryCardDataCy } from "./getEntryCardDataCy"

describe(`getEntryCardDataCy`, () => {
  it(`
    GIVEN away-with-make-up-time-entry created on Monday, 14:00–16:00 
    WHEN we call the function
    SHOULD return away-with-make-up-time-entry-monday-14:00-16:00 
  `, () => {
    expect(getEntryCardDataCy({
      entryName: `away-with-make-up-time-entry`,
      startTime: new Date(2026, 0, 5, 14, 0, 0),
      endTime: new Date(2026, 0, 5, 16, 0, 0),
    }))
      .to
      .eq(`away-with-make-up-time-entry-monday-14:00-16:00`)
  })

  it(`
    GIVEN task-entry created on Friday, 14:00–14:15 
    WHEN we call the function
    SHOULD return task-entry-friday-14:00-14:15 
  `, () => {
    expect(getEntryCardDataCy({
      entryName: `task-entry`,
      startTime: new Date(2026, 8, 4, 14, 0, 0),
      endTime: new Date(2026, 8, 4, 14, 15, 0),
    }))
      .to
      .eq(`task-entry-friday-14:00-14:15`)
  })
})
