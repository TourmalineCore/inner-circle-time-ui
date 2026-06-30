import { CreateAwayWithMakeUpTimeEntryRequest, UpdateAwayWithMakeUpTimeEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { AwayWithMakeUpTimeEntryState } from "../../sections/AwayWithMakeUpTimeEntry/state/AwayWithMakeUpTimeEntryState"
import { AwayWithMakeUpTimeEntryStateContext } from "../../sections/AwayWithMakeUpTimeEntry/state/AwayWithMakeUpTimeEntryStateContext"
import { AwayWithMakeUpTimeEntryContent } from "../../sections/AwayWithMakeUpTimeEntry/AwayWithMakeUpTimeEntryContent"

export const AWAY_WITH_MAKE_UP_TIME_ENTRY_STRATEGY: EntryStrategy = {
  entryStateConstructor: AwayWithMakeUpTimeEntryState,
  StateContext: AwayWithMakeUpTimeEntryStateContext,
  EntryContent: ({
    isMakeUpTimeEditMode,
  }: {
    isMakeUpTimeEditMode: boolean,
  }) => <AwayWithMakeUpTimeEntryContent isMakeUpTimeEditMode={isMakeUpTimeEditMode} />,
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
  initializeNewEntry: ({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: AwayWithMakeUpTimeEntryState,
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
    entryState: AwayWithMakeUpTimeEntryState,
  }) => await initializeExistingEntry({
    entryId,
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
  label: ``,
}

async function initializeExistingEntry({
  entryId,
  entryState,
}: {
  entryId: number,
  entryState: AwayWithMakeUpTimeEntryState,
}) {
  const {
    data: {
      awayWithMakeUpTimeEntry,
    },
  } = await api.trackingGetAwayWithMakeUpTimeEntry(entryId)

  entryState.initializeExistingEntry({
    awayWithMakeUpTimeEntry: {
      date: new Date(awayWithMakeUpTimeEntry.startTime),
      start: new Date(awayWithMakeUpTimeEntry.startTime),
      end: new Date(awayWithMakeUpTimeEntry.endTime),
      description: awayWithMakeUpTimeEntry.description,
      makeUpTimeList: awayWithMakeUpTimeEntry
        .makeUpTimeList
        .map(({
          id,
          startTime,
          endTime,
        }) => ({
          id,
          date: new Date(startTime),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        })), 
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
  entryState.setIsTriedToSubmit()

  if (!entryState.isValid) {
    return false
  }
  
  return true
}