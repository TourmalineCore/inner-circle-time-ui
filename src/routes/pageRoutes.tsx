import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  return routes
}
