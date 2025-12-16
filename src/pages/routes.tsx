import { TimeTrackerPage } from "./time-tracker/TimeTrackerPage"

const DEFAULT_PATH = `/time`

export const timeTrackerRoutes = {
  path: `${DEFAULT_PATH}/tracking`,
  breadcrumb: `Time Tracker`,
  Component: TimeTrackerPage,
}