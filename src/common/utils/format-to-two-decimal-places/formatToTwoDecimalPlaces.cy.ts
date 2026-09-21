import { formatToTwoDecimalPlaces } from "./formatToTwoDecimalPlaces"

describe(`formatToTwoDecimalPlaces`, () => {
  it(`should return 1.23 when given 1.239`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 1.239,
    }))
      .to
      .eq(1.23)
  })

  it(`should return 5 when given 5`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 5,
    }))
      .to
      .eq(5)
  })

  it(`should return -1.23 when given -1.239`, () => {
    expect(formatToTwoDecimalPlaces({
      value: -1.239,
    }))
      .to
      .eq(-1.23)
  })

  it(`should return 0 when given 0 and 0.001`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 0,
    }))
      .to
      .eq(0)
  })
  
  it(`should return 0 when given 0.001`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 0.001,
    }))
      .to
      .eq(0)
  })
})