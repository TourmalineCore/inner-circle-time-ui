import { createContext } from 'react'
import { UnwellEntryState } from './UnwellEntryState'

export const UnwellEntryStateContext = createContext<UnwellEntryState>(null as unknown as UnwellEntryState)
