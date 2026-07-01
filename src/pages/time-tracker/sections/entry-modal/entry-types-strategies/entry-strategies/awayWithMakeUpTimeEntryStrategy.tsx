import { CreateAwayWithMakeUpTimeEntryRequest, UpdateAwayWithMakeUpTimeEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { AwayWithMakeUpTimeEntryState } from "../../sections/AwayWithMakeUpTimeEntry/state/AwayWithMakeUpTimeEntryState"
import { AwayWithMakeUpTimeEntryStateContext } from "../../sections/AwayWithMakeUpTimeEntry/state/AwayWithMakeUpTimeEntryStateContext"
import { AwayWithMakeUpTimeEntryContent } from "../../sections/AwayWithMakeUpTimeEntry/AwayWithMakeUpTimeEntryContent"
import { EntryType } from "../../../../../../common/constants/entryType"

export class AwayWithMakeUpTimeEntryStrategy implements EntryStrategy {
  readonly entryType = EntryType.AWAY_WITH_MAKE_UP_TIME
  readonly entryStateConstructor = AwayWithMakeUpTimeEntryState
  readonly StateContext = AwayWithMakeUpTimeEntryStateContext
  readonly EntryContent = (props: any) => <AwayWithMakeUpTimeEntryContent {...props} />
  readonly modalConfiguration = {
    label: ``,
    hasCopyButton: true,
    hasDeleteButton: true,
  }

  validateOnClient({
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

  buildRequestData({
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

  initializeNewEntry({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: AwayWithMakeUpTimeEntryState,
  }) {
    entryState.initializeNewEntry({
      startTime,
      endTime,
    })
  }

  async initializeExistingEntryAsync({
    entryId,
    entryState,
  }: {
    entryId: number,
    entryState: AwayWithMakeUpTimeEntryState,
  }) {
    const {
      data: awayWithMakeUpTimeEntry,
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

  async createEntryAsync({
    requestData,
  }: {
    requestData: CreateAwayWithMakeUpTimeEntryRequest,
  }) {
    return api.trackingCreateAwayWithMakeUpTimeEntry(requestData)
  }

  async updateEntryAsync({
    id,
    requestData,
  }: {
    id: number,
    requestData: UpdateAwayWithMakeUpTimeEntryRequest,
  }) {
    return api.trackingUpdateAwayWithMakeUpTimeEntry(id, requestData)
  }

  async loadProjectsAsync() {
    return
  }
}