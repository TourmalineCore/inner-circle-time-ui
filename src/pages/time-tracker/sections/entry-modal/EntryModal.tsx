import { ReactNode, useEffect, useMemo } from "react"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { EntryType } from "../../../../common/constants/entryType"
import { observer } from "mobx-react-lite"
import axios from "axios"
import { TASK_ENTRY_STRATEGY } from "./sections/TaskEntry/strategy"
import { UNWELL_ENTRY_STRATEGY } from "./sections/UnwellEntry/strategy"

export type EntryStrategy = {
  state: any,
  StateContext: React.Context<any>,
  setEntryData: ({
    entryData,
    state,
  }: {
    entryData: TrackedEntry,
    state: any,
  }) => unknown,
  EntryContent: ReactNode,
  clientValidation: ({
    state,
  }: {
    state: any,
  }) => boolean,
  getRequestData: ({
    state,
  }: {
    state: any,
  }) => unknown,
  createEntryAsync: ({
    requestData,
  }: {
    requestData: any,
  }) => Promise<unknown>,
  updateEntryAsync: ({
    id,
    requestData,
  }: {
    id: number,
    requestData: any,
  }) => Promise<unknown>,
  loadProjectsAsync?: ({
    state,
  }: {
    state: any,
  }) => unknown,
  finally?: ({
    state,
  }: {
    state: any,
  }) => unknown,
  buttonLabels: {
    create: string,
    update: string,
  },
}

const ENTRY_TYPES: Record<EntryType, EntryStrategy> = {
  [EntryType.TASK]: TASK_ENTRY_STRATEGY,
  [EntryType.UNWELL]: UNWELL_ENTRY_STRATEGY,
}

export const EntryModal = observer(({
  currentEntry,
  onClose,
  handleTriggerReloadState,
}: {
  currentEntry: TrackedEntry,
  onClose: () => unknown,
  handleTriggerReloadState: () => unknown,
}) => {
  const entryModalState = useMemo(
    () => new EntryModalState(),
    [],
  )

  const {
    type,
  } = entryModalState

  useEffect(() => {
    if (currentEntry.type) {
      entryModalState.setType({
        type: currentEntry.type,
      })
    }
  }, [
    currentEntry.type,
  ])

  const entry = ENTRY_TYPES[currentEntry?.type || type]

  const entryState = useMemo(() => {
    const state = new entry.state()

    entry.setEntryData({
      entryData: currentEntry,
      state: state,
    })
  
    return state
  }, [
    type,
  ])

  useEffect(() => {
    entry.loadProjectsAsync?.({
      state: entryState,
    })
  }, [
    type,
  ])

  const StateContext = entry.StateContext
  
  return (
    <EntryModalStateContext.Provider value={entryModalState}>
      <StateContext.Provider value={entryState}>
        <EntryModalContent
          onClose={onClose}
          isExistingEntry={!!currentEntry.id}
        >        
          {entry.EntryContent}
          { 
            entryState.error && (
              <span className='entry-modal__error'>
                {entryState.error}
              </span>
            )
          }
          <button
            data-cy="submit-button"
            className='entry-modal__submit'
            type='submit'
            onClick={() => onSubmitEntry()}
          >
            {currentEntry.id
              ? entry.buttonLabels.update
              : entry.buttonLabels.create
            }
          </button>
        </EntryModalContent>
      </StateContext.Provider>
    </EntryModalStateContext.Provider>
  )

  async function onSubmitEntry() {
    const isValid = entry.clientValidation({
      state: entryState,
    })

    if (!isValid) {
      return
    }
    
    try {
      const requestData = entry.getRequestData({
        state: entryState,
      })

      if (currentEntry.id) {
        await entry.updateEntryAsync({
          id: currentEntry.id,
          requestData,
        })
      }
      else {
        await entry.createEntryAsync({
          requestData,
        })
      }

      handleTriggerReloadState()

      entryState.resetError()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          entryState.setError({
            error: error.response.data.detail,
          })
        }
      }
    }
    finally {
      entry.finally?.({
        state: entryState,
      })
    }
  }
})