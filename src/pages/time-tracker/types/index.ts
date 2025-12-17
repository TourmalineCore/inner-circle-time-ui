export type TimeTrackerTable = {
  workEntries: WorkEntry[],
}

export type WorkEntry = {
  id?: number,
  title: string,
  date: Date | null,
  taskId: string,
  description: string,
  start: Date | null,
  end: Date | null,
}

export type View = 'day' | 'week'