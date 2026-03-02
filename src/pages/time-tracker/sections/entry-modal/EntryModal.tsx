import { useEffect, useMemo } from "react"
import { EntryModalContent } from "./EntryModalContent"
import { EntryModalStateContext } from "./state/EntryModalStateContext"
import { EntryModalState } from "./state/EntryModalState"
import { TrackedEntry } from "../../types"
import { observer } from "mobx-react-lite"
import axios from "axios"
import { ENTRY_TYPES_STRATEGY } from "./entry-types-strategy"

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

  const entryStrategy = ENTRY_TYPES_STRATEGY[currentEntry?.type || type]

  const entryState = useMemo(() => {
    const state = new entryStrategy.entryState()

    entryStrategy.setEntryData({
      entryData: currentEntry,
      entryState: state,
    })
  
    return state
  }, [
    type,
  ])

  useEffect(() => {
    entryStrategy.loadProjectsAsync?.({
      entryState,
    })
  }, [
    type,
  ])

  const StateContext = entryStrategy.StateContext

  const isExistingEntry = !!currentEntry.id
  
  return (
    <EntryModalStateContext.Provider value={entryModalState}>
      <StateContext.Provider value={entryState}>
        <EntryModalContent
          onClose={onClose}
          isExistingEntry={isExistingEntry}
        >        
          {entryStrategy.EntryContent}
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
            {isExistingEntry
              ? entryStrategy.buttonLabels.update
              : entryStrategy.buttonLabels.create
            }
          </button>
        </EntryModalContent>
      </StateContext.Provider>
    </EntryModalStateContext.Provider>
  )

  async function onSubmitEntry() {
    const isValid = entryStrategy.validateOnClient({
      entryState,
    })

    if (!isValid) {
      return
    }
    
    try {
      const requestData = entryStrategy.buildRequestData({
        entryState,
      })

      if (currentEntry.id) {
        await entryStrategy.updateEntryAsync({
          id: currentEntry.id,
          requestData,
        })
      }
      else {
        await entryStrategy.createEntryAsync({
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
      entryStrategy.finally?.({
        entryState,
      })
    }
  }
})