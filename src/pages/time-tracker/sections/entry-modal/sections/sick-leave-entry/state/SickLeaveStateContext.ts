import { createContext } from 'react'
import { SickLeaveEntryState } from './SickLeaveState'

export const SickLeaveEntryStateContext = createContext<SickLeaveEntryState>(null as unknown as SickLeaveEntryState)
