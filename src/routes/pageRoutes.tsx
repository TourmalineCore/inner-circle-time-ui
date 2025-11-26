import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { timeTrackerRoutes } from '../pages/routes'

//accessPermissions: Map<any, boolean>
export function getPageRoutes() {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  routes.push(timeTrackerRoutes)

  return routes
}
