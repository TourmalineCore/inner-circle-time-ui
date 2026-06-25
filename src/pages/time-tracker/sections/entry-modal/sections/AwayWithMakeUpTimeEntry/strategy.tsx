import { CreateAwayWithMakeUpTimeEntryRequest, UpdateAwayWithMakeUpTimeEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { TrackedEntry } from "../../../../types"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../../entry-types-strategy"
import { AwayWithMakeUpTimeEntryState } from "./state/AwayWithMakeUpTimeEntryState"
import { AwayWithMakeUpTimeEntryStateContext } from "./state/AwayWithMakeUpTimeEntryStateContext"
import { AwayWithMakeUpTimeEntryContent } from "./AwayWithMakeUpTimeEntryContent"

export const AWAY_WITH_MAKE_UP_TIME_ENTRY_STRATEGY: EntryStrategy = {
  entryStateConstructor: AwayWithMakeUpTimeEntryState,
  StateContext: AwayWithMakeUpTimeEntryStateContext,
  setEntryData: ({
    entryData,
    entryState,
  }: {
    entryData: TrackedEntry,
    entryState: AwayWithMakeUpTimeEntryState,
  }) => setAwayWithMakeUpTimeEntryData({
    entryState,
    entryData,
  }), 
  EntryContent: <AwayWithMakeUpTimeEntryContent />,
  validateOnClient: ({
    entryState,
  }: {
      entryState: AwayWithMakeUpTimeEntryState,
    }) => validateAwayWithMakeUpTimeEntry({
    entryState,
  }),
  buildRequestData: ({
    entryState,
  }: {
    entryState: AwayWithMakeUpTimeEntryState,
  }) => buildAwayWithMakeUpTimeEntryRequest({
    entryState, 
  }),
  createEntryAsync: ({
    requestData,
  }: {
    requestData: CreateAwayWithMakeUpTimeEntryRequest,
  }) => api.trackingCreateAwayWithMakeUpTimeEntry(requestData),
  updateEntryAsync: ({
    id,
    requestData,
  }: {
    id: number,
    requestData: UpdateAwayWithMakeUpTimeEntryRequest,
  }) => api.trackingUpdateAwayWithMakeUpTimeEntry(id, requestData),
  loadProjectsAsync: async () => {},
  finally: () => {},
  label: ``,
}

function setAwayWithMakeUpTimeEntryData({
  entryData,
  entryState,
}: {
  entryData: TrackedEntry,
  entryState: AwayWithMakeUpTimeEntryState,
}) {
  const makeUpTimeList = entryData
    .makeUpTimeList?.map(({
      id,
      startTime,
      endTime,
    }) => ({
      id,
      date: startTime,
      startTime,
      endTime,
    })) || []    

  entryState.initialize({
    awayWithMakeUpTimeEntry: {
      id: entryData?.id,
      date: entryData.start,
      start: entryData.start,
      end: entryData.end,
      description: entryData.description || ``,
      makeUpTimeList,
    },
  })
}

function buildAwayWithMakeUpTimeEntryRequest({
  entryState,
}: {
  entryState: AwayWithMakeUpTimeEntryState,
}) {
  const {
    date,
    start,
    end,
    description,
    makeUpTimeList,
  } = entryState.awayWithMakeUpTimeEntryData
    
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
    description,
    makeUpTimeList: makeUpTimeList.map(({
      date,
      startTime,
      endTime,
    }) => ({
      startTime: concatDateAndTime({
        date: date!,
        time: startTime!,
      }),
      endTime: concatDateAndTime({
        date: date!,
        time: endTime!,
      }),
    })), 
  }
}

function validateAwayWithMakeUpTimeEntry({
  entryState,
}: {
  entryState: AwayWithMakeUpTimeEntryState,
}) {
  entryState.setIsSaving()
  entryState.setIsTriedToSubmit()

  if (!entryState.isValid) {
    entryState.resetIsSaving()
    return false
  }
  
  return true
}