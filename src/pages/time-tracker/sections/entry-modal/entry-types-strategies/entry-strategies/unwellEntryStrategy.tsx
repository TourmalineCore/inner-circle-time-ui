import { CreateUnwellEntryRequest, UpdateUnwellEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { UnwellEntryState } from "../../sections/UnwellEntry/state/UnwellEntryState"
import { UnwellEntryStateContext } from "../../sections/UnwellEntry/state/UnwellEntryStateContext"
import { UnwellEntryContent } from "../../sections/UnwellEntry/UnwellEntryContent"

export const UNWELL_ENTRY_STRATEGY: EntryStrategy = {
  entryStateConstructor: UnwellEntryState,
  StateContext: UnwellEntryStateContext,
  EntryContent: () => <UnwellEntryContent />,
  validateOnClient: () => validateUnwellEntry(),
  buildRequestData: ({
    entryState,
  }: {
    entryState: UnwellEntryState,
  }) => buildUnwellEntryRequest({
    entryState, 
  }),
  initializeNewEntry: ({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: UnwellEntryState,
  }) => {
    entryState.initializeNewEntry({
      startTime,
      endTime,
    })
  },
  initializeExistingEntryAsync: async ({
    entryId, 
    entryState,
  }: {
    entryId: number,
    entryState: UnwellEntryState,
  }) => await initializeExistingEntry({
    entryId,
    entryState,
  }),
  createEntryAsync: ({
    requestData,
  }: {
    requestData: CreateUnwellEntryRequest,
  }) => api.trackingCreateUnwellEntry(requestData),
  updateEntryAsync: ({
    id,
    requestData,
  }: {
    id: number,
    requestData: UpdateUnwellEntryRequest,
  }) => api.trackingUpdateUnwellEntry(id, requestData),
  loadProjectsAsync: async () => {},
  modalConfiguration: {
    label: ``,
    hasCopyButton: true,
    hasDeleteButton: true,
  },
}

async function initializeExistingEntry({
  entryId,
  entryState,
}: {
  entryId: number,
  entryState: UnwellEntryState,
}) {
  const {
    data: {
      unwellEntry,
    },
  } = await api.trackingGetUnwellntry(entryId)

  entryState.initializeExistingEntry({
    unwellEntry: {
      id: unwellEntry.id,
      date: new Date(unwellEntry.startTime),
      start: new Date(unwellEntry.startTime),
      end: new Date(unwellEntry.endTime),
    },
  })
}

function buildUnwellEntryRequest({
  entryState,
}: {
  entryState: UnwellEntryState,
}) {
  const {
    date,
    start,
    end,
  } = entryState.unwellEntryData
    
  const startDateTime = concatDateAndTime({
    date: date!,
    time: start!,
  })

  const endDateTime = concatDateAndTime({
    date: date!,
    time: end!,
  })

  return {
    startTime: startDateTime,
    endTime: endDateTime,
  }
}

function validateUnwellEntry() {
  return true
}