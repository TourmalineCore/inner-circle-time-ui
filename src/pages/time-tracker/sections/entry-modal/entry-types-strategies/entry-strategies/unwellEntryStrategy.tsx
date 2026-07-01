import { CreateUnwellEntryRequest, UpdateUnwellEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { concatDateAndTime } from "../../../../utils/date-and-time"
import { EntryStrategy } from "../entryTypesStrategy"
import { UnwellEntryState } from "../../sections/UnwellEntry/state/UnwellEntryState"
import { UnwellEntryStateContext } from "../../sections/UnwellEntry/state/UnwellEntryStateContext"
import { UnwellEntryContent } from "../../sections/UnwellEntry/UnwellEntryContent"
import { EntryType } from "../../../../../../common/constants/entryType"

export class UnwellEntryStrategy implements EntryStrategy {
  readonly type = EntryType.UNWELL
  readonly entryStateConstructor = UnwellEntryState
  readonly StateContext = UnwellEntryStateContext
  readonly EntryContent = () => <UnwellEntryContent />
  
  modalConfiguration = {
    label: ``,
    hasCopyButton: true,
    hasDeleteButton: true,
  }

  validateOnClient() {
    return true
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

  async createEntryAsync({
    requestData,
  }: {
    requestData: CreateUnwellEntryRequest,
  }) {
    return api.trackingCreateUnwellEntry(requestData)
  }

  async updateEntryAsync({
    id,
    requestData,
  }: {
    id: number,
    requestData: UpdateUnwellEntryRequest,
  }) {
    return api.trackingUpdateUnwellEntry(id, requestData)
  }

  async loadProjectsAsync(){
    return
  }
}