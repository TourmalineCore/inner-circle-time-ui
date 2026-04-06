import { CreateUnwellEntryRequest, UpdateUnwellEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { TrackedEntry } from "../../../../types"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../../entry-types-strategy"
import { UnwellEntryState } from "./state/UnwellEntryState"
import { UnwellEntryStateContext } from "./state/UnwellEntryStateContext"
import { UnwellEntryContent } from "./UnwellEntryContent"

export const UNWELL_ENTRY_STRATEGY: EntryStrategy = {
  entryStateConstructor: UnwellEntryState,
  StateContext: UnwellEntryStateContext,
  setEntryData: ({
    entryData,
    entryState,
  }: {
    entryData: TrackedEntry,
    entryState: UnwellEntryState,
  }) => setUnwellEntryData({
    entryState,
    entryData,
  }), 
  EntryContent: <UnwellEntryContent />,
  validateOnClient: () => validateUnwellEntry(),
  buildRequestData: ({
    entryState,
  }: {
    entryState: UnwellEntryState,
  }) => buildUnwellEntryRequest({
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
  finally: () => {},
  label: ``,
}

function setUnwellEntryData({
  entryData,
  entryState,
}: {
  entryData: TrackedEntry,
  entryState: UnwellEntryState,
}) {
  entryState.updateUnwellEntryData({
    unwellEntryData: {
      id: entryData.id,
      date: entryData.start,
      start: entryData.start,
      end: entryData.end,
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