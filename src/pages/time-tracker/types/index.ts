import { Project } from "../../../../api"

export type WorkEntryBase = {
  id?: number,
  title: string,
  date: Date | null,
  taskId: string,
  description: string,
  start: Date | null,
  end: Date | null,
}

export type WorkEntryModal = WorkEntryBase & {
  projectId: number,
}

export type TimeTrackerTable = {
  workEntries: WorkEntryItem [],
}

export type WorkEntryItem = (WorkEntryBase & {
  project: Project,
})

export type View = 'day' | 'week'