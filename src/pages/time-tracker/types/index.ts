export type TimeTrackerTable = {
  workEntries: WorkEntry[],
}

export type WorkEntry = {
  id?: number,
  title: string,
  date: Date,
  taskId?: string,
  start: Date,
  end: Date,
}

export type View = 'day' | 'week'

export type WorkEntriesResponse = {
  workEntries: WorkEntryItem[],
}

export type WorkEntryItem = {
  id: number,
  title: string,
  taskId?: string,
  startTime: Date,
  endTime: Date,
} 