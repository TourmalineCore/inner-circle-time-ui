import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { timeTrackerRoutes } from '../pages/routes'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`CanManagePersonalTimeTracker`)) {
    routes.push(timeTrackerRoutes)
  }

  return routes
}
