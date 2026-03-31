import { EntryModalStateContext } from './state/EntryModalStateContext'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { EntryModalContent } from './EntryModalContent'
import { EntryStrategy } from './entry-types-strategy'
import axios from 'axios'
import { reloadEntriesEvent } from '../../event-bus'

export const EntryModalContainer = observer(({
  entryStrategy,
}: {
  entryStrategy: EntryStrategy,
}) => {
  const entryModalState = useContext(EntryModalStateContext)
  const entryState = useContext(entryStrategy.StateContext)

  const {
    currentEntry,
    isCopyMode,
    type,
  } = entryModalState

  useEffect(() => {
    entryStrategy.loadProjectsAsync({
      entryState,
    })
  }, [
    type,
  ])

  const isExistingEntry = !!currentEntry?.id
  const isDisabledTypesSelect = !!currentEntry?.id || isCopyMode

  return (
    <EntryModalContent
      isExistingEntry={isExistingEntry}
      isDisabledTypesSelect={isDisabledTypesSelect}
      onSubmitEntry={onSubmitEntry}
      buttonLabel={entryStrategy.label}
    >
      {entryStrategy.EntryContent}
    </EntryModalContent> 
  )

  async function onSubmitEntry() {
    const isValid = entryStrategy.validateOnClient({
      entryState,
    })

    if (!isValid) {
      entryModalState.setError({
        error: `Fill in all the fields`,
      })
      return
    }
    
    try {
      const requestData = entryStrategy.buildRequestData({
        entryState,
      })

      if (currentEntry?.id) {
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

      entryModalState.closeEntryModal()
      reloadEntriesEvent()
      entryModalState.resetCurrentEntry()

      entryState.resetError()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          entryModalState.setError({
            error: error.response.data.detail,
          })
        }
      }
    }
    finally {
      entryStrategy.finally({
        entryState,
      })
    }
  }
})
