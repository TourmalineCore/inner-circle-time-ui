import { CreateSickLeaveEntryRequest, UpdateSickLeaveEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../common/api/api"
import { entryStrategyRegistry, EntryStrategy } from "../entryStrategyRegistry"
import { EntryBase } from "../../types"
import { SickLeaveEntryState } from "../../sections/entry-modal/sections/sick-leave-entry/state/SickLeaveEntryState"
import { SickLeaveEntryStateContext } from "../../sections/entry-modal/sections/sick-leave-entry/state/SickLeaveEntryStateContext"
import moment from "moment"
import { SickLeaveEntryContent } from "../../sections/entry-modal/sections/sick-leave-entry/SickLeaveEntryContent"
import { EntryType } from "../../../../common/constants/entryType"
  
export class SickLeaveEntryStrategy implements EntryStrategy {
  readonly entryStateConstructor = SickLeaveEntryState
  readonly StateContext = SickLeaveEntryStateContext
  readonly EntryContent = () => <SickLeaveEntryContent />
  readonly modalConfiguration = {
    label: ``,
    hasCopyButton: false,
    hasDeleteButton: true,
  }

  initializeNewEntry({
    initialEntryData,
    entryState,
  }: {
    initialEntryData: EntryBase,
    entryState: SickLeaveEntryState,
  }) {
    entryState.initializeEntry({
      sickLeaveEntry: {
        period: {
          startDate: initialEntryData.date,
          endDate: initialEntryData.date,
        },
      },
    })
  }

  async initializeExistingEntryAsync({
    entryId,
    entryState,
  }: {
    entryId: number,
    entryState: SickLeaveEntryState,
  }) {
    const {
      data,
    } = await api
      .tracking
      .getSickLeaveEntry(entryId)
    
    entryState.initializeEntry({
      sickLeaveEntry: {
        id: data.id,
        period: {
          startDate: new Date(data.period.startDate),
          endDate: new Date(data.period.endDate),
        },
      },
    })
  }

  async createEntryAsync({
    requestData,
  }: {
    requestData: CreateSickLeaveEntryRequest,
  }) {
    return api
      .tracking
      .createSickLeaveEntry(requestData)
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: UpdateSickLeaveEntryRequest,
  }) {
    return api
      .tracking
      .updateSickLeaveEntry(entryId, requestData)
  }

  buildRequestData({
    entryState, 
  }: { 
    entryState: SickLeaveEntryState,
  }) {
    const {
      period: {
        startDate,
        endDate,
      },
    } = entryState.sickLeaveEntry
      
    return {
      period: {
        startDate: moment(startDate)
          .format(`YYYY-MM-DD`),
        endDate: moment(endDate)
          .format(`YYYY-MM-DD`),
      },
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
  entryType: EntryType.SICK_LEAVE,
  strategyFactory: () => new SickLeaveEntryStrategy(),
})