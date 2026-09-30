import { concatDateAndTimeToMinute } from "./dateAndTime"

describe(`concatDateAndTimeToMinute`, () => {
  it(`
    GIVEN date 25 September and time 30 September 10:00:00 
    WHEN we call the function
    SHOULD return 2026-09-25T10:00:00 taking date from date and time from time 
  `, () => {
    expect(concatDateAndTimeToMinute({
      date: new Date(2026, 8, 25),
      time: new Date(2026, 8, 30, 10, 0, 0),
    }))
      .to
      .eq(`2026-09-25T10:00:00`)
  })

  it(`
    GIVEN date 30 September and time 07:00:10
    WHEN we call the function
    SHOULD return 2026-09-30T07:00:00 with seconds reset to zero 
  `, () => {
    expect(concatDateAndTimeToMinute({
      date: new Date(2026, 8, 30),
      time: new Date(2026, 8, 30, 7, 0, 10),
    }))
      .to
      .eq(`2026-09-30T07:00:00`)
  })
})