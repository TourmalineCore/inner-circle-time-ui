import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'

//accessPermissions: Map<any, boolean>
export function getPageRoutes() {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  return routes
}
