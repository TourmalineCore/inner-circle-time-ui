import { CreateUnwellEntryRequest, UpdateUnwellEntryRequest } from "../../../../../../../api"
import { api } from "../../../../../../common/api/api"
import { TrackedEntry } from "../../../../types"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../../EntryModal"
import { UnwellEntryState } from "./state/UnwellEntryState"
import { UnwellEntryStateContext } from "./state/UnwellEntryStateContext"
import { UnwellEntryContent } from "./UnwellEntryContent"

export const UNWELL_ENTRY_STRATEGY: EntryStrategy = {
  state: UnwellEntryState,
  StateContext: UnwellEntryStateContext,
  setEntryData: ({
    entryData,
    state,
  }: {
    entryData: TrackedEntry,
    state: UnwellEntryState,
  }) => {
    state.updateUnwellEntryData({
      unwellEntryData: {
        id: entryData?.id,
        date: entryData.start,
        start: entryData.start,
        end: entryData.end,
      },
    })
  }, 
  EntryContent: <UnwellEntryContent />,
  clientValidation: () => true,
  getRequestData: ({
    state,
  }: {
    state: UnwellEntryState,
  }) => {
    const {
      date,
      start,
      end,
    } = state.unwellEntryData
      
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
  },
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
  buttonLabels: {
    create: `Add`,
    update: `Update`,
  },
}