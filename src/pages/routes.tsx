import { TimeTrackerPage } from "./time-tracker/TimeTrackerPage"

const DEFAULT_PATH = `/time`

export const timeTrackerRoutes = {
  path: DEFAULT_PATH,
  breadcrumb: `Time Tracker`,
  Component: TimeTrackerPage,
}