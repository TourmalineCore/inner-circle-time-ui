import { CreateSickLeaveEntryRequest, UpdateSickLeaveEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { EntryStrategy } from "../entryTypesStrategy"
import { EntryType } from "../../../../../../common/constants/entryType"
import { EntryBase } from "../../../../types"
import { SickLeaveEntryState } from "../../sections/SickLeaveEntry/state/SickLeaveState"
import { SickLeaveEntryStateContext } from "../../sections/SickLeaveEntry/state/SickLeaveStateContext"
import moment from "moment"
import { SickLeaveEntryContent } from "../../sections/SickLeaveEntry/SickLeaveEntryContent"

export class SickLeaveEntryStrategy implements EntryStrategy {
  readonly entryType = EntryType.SICK_LEAVE
  readonly entryStateConstructor = SickLeaveEntryState
  readonly StateContext = SickLeaveEntryStateContext
  readonly EntryContent = () => <SickLeaveEntryContent />
  readonly modalConfiguration = {
    label: ``,
    hasCopyButton: true,
    hasDeleteButton: true,
    isAllDayEntryType: true,
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
    } = await api.trackingGetSickLeaveEntry(entryId)
    
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
    return api.trackingCreateSickLeaveEntry(requestData)
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: UpdateSickLeaveEntryRequest,
  }) {
    return api.trackingUpdateSickLeaveEntry(entryId, requestData)
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