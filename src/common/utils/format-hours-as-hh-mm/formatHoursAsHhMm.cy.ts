import { formatHoursAsHhMm } from "./formatHoursAsHhMm"

describe(`formatHoursAsHhMm`, () => {
  it(`should return 0m when given 0`, () => {
    expect(formatHoursAsHhMm({
      hours: 0,
    }))
      .to
      .eq(`0m`)
  })

  it(`should return 1m when given 0.0167`, () => {
    expect(formatHoursAsHhMm({
      hours: 0.0167,
    }))
      .to
      .eq(`1m`)
  })

  it(`should return 15m when given 0.25`, () => {
    expect(formatHoursAsHhMm({
      hours: 0.25,
    }))
      .to
      .eq(`15m`)
  })

  it(`should return 30m when given 0.5`, () => {
    expect(formatHoursAsHhMm({
      hours: 0.5,
    }))
      .to
      .eq(`30m`)
  })

  it(`should return 45m when given 0.75`, () => {
    expect(formatHoursAsHhMm({
      hours: 0.75,
    }))
      .to
      .eq(`45m`)
  })
  
  it(`should return 1h 0m when given 1`, () => {
    expect(formatHoursAsHhMm({
      hours: 1,
    }))
      .to
      .eq(`1h 0m`)
  })

  it(`should return 2h 20m when given 2.33`, () => {
    expect(formatHoursAsHhMm({
      hours: 2.33,
    }))
      .to
      .eq(`2h 20m`)
  })

  it(`should return 2h 30m when given 2.5`, () => {
    expect(formatHoursAsHhMm({
      hours: 2.5,
    }))
      .to
      .eq(`2h 30m`)
  })

  it(`should return 3h 5m when given 3.08`, () => {
    expect(formatHoursAsHhMm({
      hours: 3.08,
    }))
      .to
      .eq(`3h 5m`)
  })

  it(`should return 40h 0m when given 40`, () => {
    expect(formatHoursAsHhMm({
      hours: 40,
    }))
      .to
      .eq(`40h 0m`)
  })
})