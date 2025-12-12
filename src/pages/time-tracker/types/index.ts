export type TimeTrackerTable = {
  workEntries: WorkEntry[],
}

export type WorkEntry = {
  id?: number,
  title: string,
  date: Date | null,
  taskId?: string,
  start: Date | null,
  end: Date | null,
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