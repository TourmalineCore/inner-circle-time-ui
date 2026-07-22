import { TrackedEntry } from "../../../pages/time-tracker/types"
import { findEntryForDate } from "./findEntryForDate"

describe(`FindEntryForDate`, () => {   
  const entries = [
    { 
      start: new Date(`2026-07-20`), 
      end: new Date(`2026-07-25`), 
    },
  ]
    
  it(`
  GIVEN empty entries list
  WHEN try searching for any date
  SHOULD return undefined
  `, () => {
    const entries: TrackedEntry[] = []

    const date = new Date(`2026-07-22`)
    
    const result = findEntryForDate({
      entries,
      date, 
    })
    
    expect(result)
      .to
      .be
      .undefined
  })
  
  it(`
  GIVEN entry with period from July 20 to July 25
  WHEN searching for July 22
  SHOULD return the entry
  `, () => {
    const date = new Date(`2026-07-22`)
  
    const result = findEntryForDate({
      entries,
      date, 
    })
  
    expect(result)
      .to
      .eq(entries[0])
  })

  it(`  
  GIVEN entry with period from July 20 to July 25
  WHEN searching for July 20 (the date is equal to the entry start date)
  SHOULD return the entry
  `, () => {
    const date = new Date(`2026-07-20`)
  
    const result = findEntryForDate({
      entries,
      date, 
    })
  
    expect(result)
      .to
      .eq(entries[0])
  })

  it(`
  GIVEN entry with period from July 20 to July 25
  WHEN searching for July 25 (the date is equal to the entry end date)
  SHOULD return the entry
  `, () => {
    const date = new Date(`2026-07-25`)
  
    const result = findEntryForDate({
      entries,
      date, 
    })
  
    expect(result)
      .to
      .eq(entries[0])
  })
  
  it(`
  GIVEN entry with period from July 20 to July 25
  WHEN searching for July 19
  SHOULD return undefined
  `, () => {
    const date = new Date(`2026-07-19`)
  
    const result = findEntryForDate({
      entries,
      date, 
    })
  
    expect(result)
      .to
      .be
      .undefined
  })

  it(`
  GIVEN entry with period from July 20 to July 25
  WHEN searching for July 26
  SHOULD return undefined
  `, () => {
    const date = new Date(`2026-07-26`)
  
    const result = findEntryForDate({
      entries,
      date, 
    })
  
    expect(result)
      .to
      .be
      .undefined
  })
})