import { ProjectDto } from "../../../../api"
import { EntryType } from "../../../common/constants/entryType"

export type TrackedEntry = {
  id?: number,
  title?: string,
  taskId?: string,
  project?: ProjectDto,
  description?: string,
  type?: EntryType,
  date: Date | null,
  start: Date,
  end: Date,
}

export type TimeTrackerTable = {
  entries: TrackedEntry[],
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

export type View = 'day' | 'week'