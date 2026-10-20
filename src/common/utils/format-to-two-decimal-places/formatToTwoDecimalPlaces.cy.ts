import { formatToTwoDecimalPlaces } from "./formatToTwoDecimalPlaces"

describe(`formatToTwoDecimalPlaces`, () => {
  it(`should return 1.13 when given 1.13`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 1.13,
    }))
      .to
      .eq(1.13)
  })

  it(`should return 0.29 when given 0.29`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 0.29,
    }))
      .to
      .eq(0.29)
  })

  it(`data should not be lost during accumulation`, () => {
    const result = [
      0.29,
      0.29,
      0.29,
    ].reduce((sum, value) => {
      return formatToTwoDecimalPlaces({
        value: sum + value,
      })
    }, 0)
      
    expect(result)
      .to
      .eq(0.87)
  })
  
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
  
  it(`should return 0 when given 0.001`, () => {
    expect(formatToTwoDecimalPlaces({
      value: 0.001,
    }))
      .to
      .eq(0)
  })
})