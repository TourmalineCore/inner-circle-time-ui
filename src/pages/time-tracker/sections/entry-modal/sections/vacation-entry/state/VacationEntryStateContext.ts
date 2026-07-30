import { createContext } from 'react'
import { VacationEntryState } from './VacationEntryState'

export const VacationEntryStateContext = createContext<VacationEntryState>(null as unknown as VacationEntryState)
