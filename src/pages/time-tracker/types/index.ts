import { ProjectDto } from "../../../../api"

export type WorkEntryBase = {
  id?: number,
  title: string,
  date: Date | null,
  taskId: string,
  description: string,
  start: Date | null,
  end: Date | null,
}

export type EntryBase = {
  id?: number,
  date: Date | null,
  start: Date | null,
  end: Date | null,
}

export type TaskEntry = EntryBase & {
  title: string,
  projectId: number,
  taskId: string,
  description: string,
}

export type TimeTrackerTable = {
  workEntries: WorkEntryItem[],
}

export type WorkEntryItem = WorkEntryBase & {
  project: ProjectDto,
}

export type View = 'day' | 'week'