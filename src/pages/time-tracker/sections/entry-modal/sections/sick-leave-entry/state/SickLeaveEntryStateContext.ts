import { createContext } from 'react'
import { SickLeaveEntryState } from './SickLeaveEntryState'

export const SickLeaveEntryStateContext = createContext<SickLeaveEntryState>(null as unknown as SickLeaveEntryState)
