import { makeAutoObservable } from 'mobx'
import { formatToTwoDecimalPlaces } from '../../../common/utils/formatToTwoDecimalPlaces'
import { EmployeeDto, TrackedEntryDto } from '@tourmalinecore/inner-circle-time-api-js-client'
import { PersonalReportData } from '../types'
import moment from 'moment'
import { TYPE_LABELS } from '../../../common/constants/entryType'

export const UNSPECIFIED_EMPLOYEE_ID = 0

export class PersonalReportState {
  private _personalReportData: PersonalReportData = {
    trackedEntries: [],
    taskHours: 0,
    unwellHours: 0,
  } 
  private _selectedDate = new Date()
  private _employees: EmployeeDto[] = []
  private _selectedEmployeeId = UNSPECIFIED_EMPLOYEE_ID 

  constructor() {
    makeAutoObservable(this)
  }

  get personalReportData() {
    return this._personalReportData
  }

  get selectedDate() {
    return this._selectedDate
  }

  get monthYearDate() {
    const month = this._selectedDate.getMonth() + 1
    const year = this._selectedDate.getFullYear()
    return {
      month,
      year,
    }
  }

  get employees() {
    return this._employees
  }

  get selectedEmployeeId() {
    return this._selectedEmployeeId
  }

  get totalHours() {
    const totalPayableHours = formatToTwoDecimalPlaces(this._personalReportData.taskHours + this._personalReportData.unwellHours)

    return {
      totalTrackedHoursPerMonth: totalPayableHours,
      totalPayableHours,
    }
  }

  initializePersonalReport({
    trackedEntries,
    taskHours,
    unwellHours,
  }: {
    trackedEntries: TrackedEntryDto[],
    taskHours: number,
    unwellHours: number,
  }) {
    this._personalReportData = {
      trackedEntries: trackedEntries.map((entry) => ({
        id: entry.id,
        date: moment(entry.startTime)
          .format(`D.MM`)
          .toString(),
        trackedHoursPerDay: formatToTwoDecimalPlaces(entry.trackedHoursPerDay),
        time: `${moment(entry.startTime)
          .format(`HH:mm`)} - ${moment(entry.endTime)
          .format(`HH:mm`)}`,
        hours: formatToTwoDecimalPlaces(entry.hours),
        entryType: TYPE_LABELS[entry.entryType],
        project: entry.project ? entry.project.name : `-`,
        taskId: entry.task ? entry.task.id : `-`,
        taskTitle: entry.task ? entry.task.title : `-`,
        description: entry.description || `-`,
      })),
      taskHours: formatToTwoDecimalPlaces(taskHours),
      unwellHours: formatToTwoDecimalPlaces(unwellHours),
    }
  }

  initializeEmployees({
    employees,
  }: {
    employees: EmployeeDto[],
  }) {
    this._employees = employees
  }

  setSelectedDate({
    newDate,
  }: {
    newDate: Date,
  }) {
    this._selectedDate = newDate
  }
  
  setSelectedEmployeeId({
    employeeId,
  }: {
    employeeId: number, 
  }) {
    this._selectedEmployeeId = employeeId
  }
}
