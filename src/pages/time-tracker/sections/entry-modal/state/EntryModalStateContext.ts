import { createContext } from 'react'
import { EntryModalState } from './EntryModalState'

export const EntryModalStateContext = createContext<EntryModalState>(null as unknown as EntryModalState)
