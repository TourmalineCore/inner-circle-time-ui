import { TimeTrackerPage } from "./time-tracker/TimeTrackerPage"

const DEFAULT_PATH = `/time/tracking`

export const timeTrackerRoutes = {
  path: DEFAULT_PATH,
  breadcrumb: `Time Tracker`,
  Component: TimeTrackerPage,
}