import { createContext } from 'react'
import { WorkItemModalState } from './WorkItemModalState'

export const WorkItemModalStateContext = createContext<WorkItemModalState>(null as unknown as WorkItemModalState)
