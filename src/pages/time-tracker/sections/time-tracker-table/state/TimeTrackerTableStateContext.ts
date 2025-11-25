import { createContext } from 'react'
import { TimeTrackerTableState } from './TimeTrackerTableState'

export const TimeTrackerStateContext = createContext<TimeTrackerTableState>(null as unknown as TimeTrackerTableState)
