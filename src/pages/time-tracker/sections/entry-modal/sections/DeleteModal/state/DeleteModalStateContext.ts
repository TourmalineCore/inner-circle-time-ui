import { createContext } from 'react'
import { DeleteModalState } from './DeleteModalState'

export const DeleteModalStateContext = createContext<DeleteModalState>(null as unknown as DeleteModalState)
