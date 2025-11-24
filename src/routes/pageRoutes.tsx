import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//accessPermissions: Map<any, boolean>
export function getPageRoutes() {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  return routes
}
