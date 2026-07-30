import { createContext } from 'react'
import { VacationEntryState } from './VacationState'

export const VacationEntryStateContext = createContext<VacationEntryState>(null as unknown as VacationEntryState)
