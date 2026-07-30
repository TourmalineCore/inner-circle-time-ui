import { CreateVacationEntryRequest, UpdateVacationEntryRequest } from "@tourmalinecore/inner-circle-time-api-js-client"
import { api } from "../../../../../../common/api/api"
import { EntryStrategy } from "../entryTypesStrategy"
import { EntryBase } from "../../../../types"
import moment from "moment"
import { VacationEntryState } from "../../sections/vacation-entry/state/VacationEntryState"
import { VacationEntryStateContext } from "../../sections/vacation-entry/state/VacationEntryStateContext"
import { VacationEntryContent } from "../../sections/vacation-entry/VacationEntryContent"

export class VacationEntryStrategy implements EntryStrategy {
  readonly entryStateConstructor = VacationEntryState
  readonly StateContext = VacationEntryStateContext
  readonly EntryContent = () => <VacationEntryContent />
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
    entryState: VacationEntryState,
  }) {
    entryState.initializeEntry({
      vacationEntry: {
        period: {
          startDate: initialEntryData.date,
          endDate: initialEntryData.date,
        },
        isUnpaid: false,
      },
    })
  }

  async initializeExistingEntryAsync({
    entryId,
    entryState,
  }: {
    entryId: number,
    entryState: VacationEntryState,
  }) {
    const {
      data: vacationEntry,
    } = await api.trackingGetVacationEntry(entryId)
    
    entryState.initializeEntry({
      vacationEntry: {
        id: vacationEntry.id,
        period: {
          startDate: new Date(vacationEntry.period.startDate),
          endDate: new Date(vacationEntry.period.endDate),
        },
        isUnpaid: vacationEntry.isUnpaid,
      },
    })
  }

  async createEntryAsync({
    requestData,
  }: {
    requestData: CreateVacationEntryRequest,
  }) {
    return api.trackingCreateVacationEntry(requestData)
  }

  async updateEntryAsync({
    entryId,
    requestData,
  }: {
    entryId: number,
    requestData: UpdateVacationEntryRequest,
  }) {
    return api.trackingUpdateVacationEntry(entryId, requestData)
  }

  buildRequestData({
    entryState, 
  }: { 
    entryState: VacationEntryState,
  }) {
    const {
      period: {
        startDate,
        endDate,
      },
      isUnpaid,
    } = entryState.vacationEntry
      
    return {
      period: {
        startDate: moment(startDate)
          .format(`YYYY-MM-DD`),
        endDate: moment(endDate)
          .format(`YYYY-MM-DD`),
      },
      isUnpaid,
    }
  }

  validateOnClient() {
    return true
  }

  async loadProjectsAsync(){
    return
  }
}