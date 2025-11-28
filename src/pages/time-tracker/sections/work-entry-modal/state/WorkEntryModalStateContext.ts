import { createContext } from 'react'
import { WorkEntryModalState } from './WorkEntryModalState'

export const WorkEntryModalStateContext = createContext<WorkEntryModalState>(null as unknown as WorkEntryModalState)
