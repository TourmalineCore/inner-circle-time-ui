import { createContext } from 'react'
import { TaskEntryState } from './TaskEntryState'

export const TaskEntryStateContext = createContext<TaskEntryState>(null as unknown as TaskEntryState)
