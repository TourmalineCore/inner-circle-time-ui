import { PersonalReportPage } from "./personal-report/PersonalReportPage"
import { TimeTrackerPage } from "./time-tracker/TimeTrackerPage"

const DEFAULT_PATH = `/time`

export const timeTrackerRoutes = {
  path: `${DEFAULT_PATH}/tracking`,
  breadcrumb: `Time Tracker`,
  Component: TimeTrackerPage,
}

export const timePersonalReportRoutes = {
  path: `${DEFAULT_PATH}/personal-report`,
  breadcrumb: `Personal Report`,
  Component: PersonalReportPage,
}