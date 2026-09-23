import { getEntryCardDataCy } from "./getEntryCardDataCy"

describe(`getEntryCardDataCy`, () => {
  it(`
    GIVEN away-with-make-up-time created on Monday, 14:00–16:00 
    WHEN we call the function
    SHOULD return away-with-make-up-time-monday-14:00-16:00 
  `, () => {
    expect(getEntryCardDataCy({
      entryName: `away-with-make-up-time`,
      startTime: new Date(2026, 0, 5, 14, 0, 0),
      endTime: new Date(2026, 0, 5, 16, 0, 0),
    }))
      .to
      .eq(`away-with-make-up-time-monday-14:00-16:00`)
  })

  it(`
    GIVEN task created on Friday, 14:00–14:15 
    WHEN we call the function
    SHOULD return task-friday-14:00-14:15 
  `, () => {
    expect(getEntryCardDataCy({
      entryName: `task`,
      startTime: new Date(2026, 8, 4, 14, 0, 0),
      endTime: new Date(2026, 8, 4, 14, 15, 0),
    }))
      .to
      .eq(`task-friday-14:00-14:15`)
  })
})
