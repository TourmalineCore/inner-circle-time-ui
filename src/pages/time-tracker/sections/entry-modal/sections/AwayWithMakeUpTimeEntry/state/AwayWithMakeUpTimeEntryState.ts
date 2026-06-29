import { makeAutoObservable } from 'mobx'
import { AwayWithMakeUpTimeEntryData } from '../../../../../types'

export const EMPTY_AWAY_WITH_MAKE_UP_TIME_ENTRY_DATA: AwayWithMakeUpTimeEntryData = {
  date: null,
  start: null,
  end: null,
  description: ``,
  makeUpTimeList: [],
}

export class AwayWithMakeUpTimeEntryState {
  private _awayWithMakeUpTimeEntryData: AwayWithMakeUpTimeEntryData = {
    ...EMPTY_AWAY_WITH_MAKE_UP_TIME_ENTRY_DATA,
  }
 
  private _isTriedToSubmit = false  

  constructor() {
    makeAutoObservable(this)
  }

  get awayWithMakeUpTimeEntryData() {
    return this._awayWithMakeUpTimeEntryData
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isDescriptionValid() {
    return this._awayWithMakeUpTimeEntryData.description !== ``
  }

  get isDescriptionError() {
    return !this.isDescriptionValid && this._isTriedToSubmit
  }

  get isAllMakeUpTimeValid() {
    return this._awayWithMakeUpTimeEntryData.makeUpTimeList.every(({
      date,
    }) => date !== null)
  }

  get isValid() {
    return (
      this.isDescriptionValid &&
      this.isAllMakeUpTimeValid 
    )
  }

  initialize({
    awayWithMakeUpTimeEntry,
  }: {
    awayWithMakeUpTimeEntry: AwayWithMakeUpTimeEntryData,
  }) {
    const makeUpTimeList = awayWithMakeUpTimeEntry.makeUpTimeList.length > 0
      ? awayWithMakeUpTimeEntry.makeUpTimeList
      : [
        {
          id: 1,
          date: null,
          startTime: getDefaultTimeForMakeUpTime(),
          endTime: getDefaultTimeForMakeUpTime(),
        },
      ]

    this._awayWithMakeUpTimeEntryData = {
      date: awayWithMakeUpTimeEntry.date,
      start: awayWithMakeUpTimeEntry.start,
      end: awayWithMakeUpTimeEntry.end,
      description: awayWithMakeUpTimeEntry.description,
      makeUpTimeList, 
    }
  }
  
  isMakeUpTimeDateError({
    makeUpTimeId,
  }: {
    makeUpTimeId: number,
  }) {
    return this._awayWithMakeUpTimeEntryData.makeUpTimeList.find(({
      id,
    }) => id == makeUpTimeId)?.date === null && this._isTriedToSubmit 
  }

  updateAwayWithMakeUpTimeEntryData({
    awayWithMakeUpTimeEntryData,
  }: {
    awayWithMakeUpTimeEntryData: Partial<AwayWithMakeUpTimeEntryData>,
  }) {
    this._awayWithMakeUpTimeEntryData = {
      ...this.awayWithMakeUpTimeEntryData,
      ...awayWithMakeUpTimeEntryData, 
    }
  }

  updateMakeUpTime({
    makeUpTime,
  }: {
    makeUpTime: {
      id: number,
      date?: Date,
      startTime?: Date,
      endTime?: Date,
    },
  }) {
    const indexOfMakeUpTimeId = this._awayWithMakeUpTimeEntryData.makeUpTimeList.findIndex(
      ({
        id, 
      }) => id === makeUpTime.id,
    )

    this._awayWithMakeUpTimeEntryData.makeUpTimeList[indexOfMakeUpTimeId] = {
      ...this._awayWithMakeUpTimeEntryData.makeUpTimeList[indexOfMakeUpTimeId],
      ...makeUpTime,
    }
  }

  addMakeUpTime() {
    const makeUpTimeList = this._awayWithMakeUpTimeEntryData.makeUpTimeList

    const maxId = [
      ...makeUpTimeList,
    ].sort((a, b) => b.id - a.id)[0].id

    this._awayWithMakeUpTimeEntryData.makeUpTimeList = [
      ...makeUpTimeList,
      {
        id: maxId + 1,
        date: null,
        startTime: getDefaultTimeForMakeUpTime(),
        endTime: getDefaultTimeForMakeUpTime(),
      },
    ]
  }

  removeMakeUpTime({
    makeUpTimeId,
  }:{
    makeUpTimeId: number,
  }) {
    this._awayWithMakeUpTimeEntryData.makeUpTimeList = this._awayWithMakeUpTimeEntryData.makeUpTimeList
      .filter(
        ({
          id,
        }) => id !== makeUpTimeId,
      )
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }
}

export function getDefaultTimeForMakeUpTime() {
  const defaultDate = new Date()

  defaultDate.setHours(0, 0, 0, 0)

  return defaultDate
}
