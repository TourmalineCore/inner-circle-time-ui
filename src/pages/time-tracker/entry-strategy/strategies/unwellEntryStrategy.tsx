import { CreateUnwellEntryRequest, UpdateUnwellEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../common/api/api"
import { concatDateAndTime } from "../../../../common/utils/dateAndTime"
import { entryStrategyRegistry, EntryStrategy } from "../entryStrategyRegistry"
import { UnwellEntryState } from "../../sections/entry-modal/sections/unwell-entry/state/UnwellEntryState"
import { UnwellEntryStateContext } from "../../sections/entry-modal/sections/unwell-entry/state/UnwellEntryStateContext"
import { UnwellEntryContent } from "../../sections/entry-modal/sections/unwell-entry/UnwellEntryContent"
import { UnwellEntryData } from "../../types"
import { EntryType } from "../../../../common/constants/entryType"
  
export class UnwellEntryStrategy implements EntryStrategy {
  readonly entryStateConstructor = UnwellEntryState
  readonly StateContext = UnwellEntryStateContext
  readonly EntryContent = () => <UnwellEntryContent />
  readonly modalConfiguration = {
    label: ``,
    hasCopyButton: true,
    hasDeleteButton: true,
  }

  initializeNewEntry({
    initialEntryData,
    entryState,
  }: {
    initialEntryData: UnwellEntryData,
    entryState: UnwellEntryState,
  }) {
    entryState.initializeEntry({
      unwellEntry: initialEntryData,
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
    } = await api
      .tracking
      .getUnwellEntry(entryId)

    entryState.initializeEntry({
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
    return api
      .tracking
      .createUnwellEntry(requestData)
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: UpdateUnwellEntryRequest,
  }) {
    return api
      .tracking
      .updateUnwellEntry(entryId, requestData)
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

entryStrategyRegistry.register({
  entryType: EntryType.UNWELL,
  strategyFactory: () => new UnwellEntryStrategy(),
})