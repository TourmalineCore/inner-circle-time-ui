export type TimeTracker = {
  workItems: WorkItem[],
}

export type WorkItem = {
  id: number,
  title: string,
  date: Date,
  taskId?: string,
  start: Date,
  end: Date,
}