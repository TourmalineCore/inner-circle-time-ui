import { EntryModalStateContext } from './state/EntryModalStateContext'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { EntryModalContent } from './EntryModalContent'
import { EntryStrategy } from './entry-types-strategy'
import axios from 'axios'
import { eventBus, EventBusType } from '../../event-bus'

export const EntryModalContainer = observer(({
  entryStrategy,
  openDeleteModal,
}: {
  entryStrategy: EntryStrategy,
  openDeleteModal: () => unknown,
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

  const id = currentEntry?.id

  const isExistingEntry = !!id
  const isDisabledTypesSelect = !!id || isCopyMode

  return (
    <EntryModalContent
      isExistingEntry={isExistingEntry}
      isDisabledTypesSelect={isDisabledTypesSelect}
      onSubmitEntry={onSubmitEntry}
      buttonLabel={entryStrategy.label}
      openDeleteModal={openDeleteModal}
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

      if (id) {
        await entryStrategy.updateEntryAsync({
          id,
          requestData,
        })
      }
      else {
        await entryStrategy.createEntryAsync({
          requestData,
        })
      }

      entryModalState.closeEntryModal()
      eventBus.publish(EventBusType.ENTRIES_CHANGED)
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
