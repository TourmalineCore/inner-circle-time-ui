import { CreateUnwellEntryRequest, UpdateUnwellEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { UnwellEntryState } from "../../sections/UnwellEntry/state/UnwellEntryState"
import { UnwellEntryStateContext } from "../../sections/UnwellEntry/state/UnwellEntryStateContext"
import { UnwellEntryContent } from "../../sections/UnwellEntry/UnwellEntryContent"
import { EntryType } from "../../../../../../common/constants/entryType"

export class UnwellEntryStrategy implements EntryStrategy {
  readonly entryType = EntryType.UNWELL
  readonly entryStateConstructor = UnwellEntryState
  readonly StateContext = UnwellEntryStateContext
  readonly EntryContent = () => <UnwellEntryContent />
  readonly modalConfiguration = {
    label: ``,
    hasCopyButton: true,
    hasDeleteButton: true,
  }

  initializeNewEntry({
    startTime,
    endTime,
    entryState,
  }: {
    startTime: Date,
    endTime: Date,
    entryState: UnwellEntryState,
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
    entryState: UnwellEntryState,
  }) {
    const {
      data: unwellEntry,
    } = await api.trackingGetUnwellEntry(entryId)

    entryState.initializeExistingEntry({
      unwellEntry: {
        id: unwellEntry.id,
        date: new Date(unwellEntry.startTime),
        start: new Date(unwellEntry.startTime),
        end: new Date(unwellEntry.endTime),
      },
    })
  }

  async createEntryAsync({
    requestData,
  }: {
    requestData: CreateUnwellEntryRequest,
  }) {
    return api.trackingCreateUnwellEntry(requestData)
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: UpdateUnwellEntryRequest,
  }) {
    return api.trackingUpdateUnwellEntry(entryId, requestData)
  }

  buildRequestData({
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

  validateOnClient() {
    return true
  }

  async loadProjectsAsync(){
    return
  }
}