import { createContext } from 'react'
import { MetricsState } from './MetricsState'

export const MetricsStateContext = createContext<MetricsState>(null as unknown as MetricsState)
