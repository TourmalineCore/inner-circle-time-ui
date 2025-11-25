import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { timeTrackerRoutes } from '../pages/routes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  routes.push(timeTrackerRoutes)

  return routes
}
