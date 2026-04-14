import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { timePersonalReportRoutes, timeTrackerRoutes } from '../pages/routes'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`CanManagePersonalTimeTracker`)) {
    routes.push(timeTrackerRoutes)
  }

  if (accessPermissions.get(`CanViewPersonalReport`)) {
    routes.push(timePersonalReportRoutes)
  }

  return routes
}
