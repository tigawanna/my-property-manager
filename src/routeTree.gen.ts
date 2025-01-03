/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileLayoutImport } from './routes/profile/layout'
import { Route as DashboardLayoutImport } from './routes/dashboard/layout'
import { Route as AuthLayoutImport } from './routes/auth/layout'
import { Route as IndexImport } from './routes/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as DashboardTodosLayoutImport } from './routes/dashboard/todos/layout'
import { Route as DashboardBillsLayoutImport } from './routes/dashboard/bills/layout'
import { Route as DashboardTodosIndexImport } from './routes/dashboard/todos/index'
import { Route as DashboardTenantsIndexImport } from './routes/dashboard/tenants/index'
import { Route as DashboardStaffIndexImport } from './routes/dashboard/staff/index'
import { Route as DashboardShopsIndexImport } from './routes/dashboard/shops/index'
import { Route as DashboardPaymentsIndexImport } from './routes/dashboard/payments/index'
import { Route as DashboardBillsIndexImport } from './routes/dashboard/bills/index'
import { Route as DashboardBillsPrintImport } from './routes/dashboard/bills/print'
import { Route as DashboardTodosTrackingIndexImport } from './routes/dashboard/todos/tracking/index'
import { Route as DashboardTodosTodosIndexImport } from './routes/dashboard/todos/$todos/index'
import { Route as DashboardTenantsTenantIndexImport } from './routes/dashboard/tenants/$tenant/index'
import { Route as DashboardStaffStaffIndexImport } from './routes/dashboard/staff/$staff/index'
import { Route as DashboardShopsShopIndexImport } from './routes/dashboard/shops/$shop/index'
import { Route as DashboardBillsShopsbillsIndexImport } from './routes/dashboard/bills/shopsbills/index'
import { Route as DashboardTodosTrackingLoadIndexImport } from './routes/dashboard/todos/tracking/load/index'
import { Route as DashboardTodosTrackingTrackingIndexImport } from './routes/dashboard/todos/tracking/$tracking/index'
import { Route as DashboardBillsShopsbillsShopsbillsIndexImport } from './routes/dashboard/bills/shopsbills/$shopsbills/index'

// Create/Update Routes

const ProfileLayoutRoute = ProfileLayoutImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutRoute = DashboardLayoutImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  path: '/',
  getParentRoute: () => ProfileLayoutRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  path: '/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  path: '/signup',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const DashboardTodosLayoutRoute = DashboardTodosLayoutImport.update({
  path: '/todos',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardBillsLayoutRoute = DashboardBillsLayoutImport.update({
  path: '/bills',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardTodosIndexRoute = DashboardTodosIndexImport.update({
  path: '/',
  getParentRoute: () => DashboardTodosLayoutRoute,
} as any)

const DashboardTenantsIndexRoute = DashboardTenantsIndexImport.update({
  path: '/tenants/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardStaffIndexRoute = DashboardStaffIndexImport.update({
  path: '/staff/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardShopsIndexRoute = DashboardShopsIndexImport.update({
  path: '/shops/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardPaymentsIndexRoute = DashboardPaymentsIndexImport.update({
  path: '/payments/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardBillsIndexRoute = DashboardBillsIndexImport.update({
  path: '/',
  getParentRoute: () => DashboardBillsLayoutRoute,
} as any)

const DashboardBillsPrintRoute = DashboardBillsPrintImport.update({
  path: '/print',
  getParentRoute: () => DashboardBillsLayoutRoute,
} as any)

const DashboardTodosTrackingIndexRoute =
  DashboardTodosTrackingIndexImport.update({
    path: '/tracking/',
    getParentRoute: () => DashboardTodosLayoutRoute,
  } as any)

const DashboardTodosTodosIndexRoute = DashboardTodosTodosIndexImport.update({
  path: '/$todos/',
  getParentRoute: () => DashboardTodosLayoutRoute,
} as any)

const DashboardTenantsTenantIndexRoute =
  DashboardTenantsTenantIndexImport.update({
    path: '/tenants/$tenant/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardStaffStaffIndexRoute = DashboardStaffStaffIndexImport.update({
  path: '/staff/$staff/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardShopsShopIndexRoute = DashboardShopsShopIndexImport.update({
  path: '/shops/$shop/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardBillsShopsbillsIndexRoute =
  DashboardBillsShopsbillsIndexImport.update({
    path: '/shopsbills/',
    getParentRoute: () => DashboardBillsLayoutRoute,
  } as any)

const DashboardTodosTrackingLoadIndexRoute =
  DashboardTodosTrackingLoadIndexImport.update({
    path: '/tracking/load/',
    getParentRoute: () => DashboardTodosLayoutRoute,
  } as any)

const DashboardTodosTrackingTrackingIndexRoute =
  DashboardTodosTrackingTrackingIndexImport.update({
    path: '/tracking/$tracking/',
    getParentRoute: () => DashboardTodosLayoutRoute,
  } as any)

const DashboardBillsShopsbillsShopsbillsIndexRoute =
  DashboardBillsShopsbillsShopsbillsIndexImport.update({
    path: '/shopsbills/$shopsbills/',
    getParentRoute: () => DashboardBillsLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLayoutImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLayoutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/bills': {
      id: '/dashboard/bills'
      path: '/bills'
      fullPath: '/dashboard/bills'
      preLoaderRoute: typeof DashboardBillsLayoutImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/todos': {
      id: '/dashboard/todos'
      path: '/todos'
      fullPath: '/dashboard/todos'
      preLoaderRoute: typeof DashboardTodosLayoutImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/': {
      id: '/auth/'
      path: '/'
      fullPath: '/auth/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthLayoutImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/profile/': {
      id: '/profile/'
      path: '/'
      fullPath: '/profile/'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof ProfileLayoutImport
    }
    '/dashboard/bills/print': {
      id: '/dashboard/bills/print'
      path: '/print'
      fullPath: '/dashboard/bills/print'
      preLoaderRoute: typeof DashboardBillsPrintImport
      parentRoute: typeof DashboardBillsLayoutImport
    }
    '/dashboard/bills/': {
      id: '/dashboard/bills/'
      path: '/'
      fullPath: '/dashboard/bills/'
      preLoaderRoute: typeof DashboardBillsIndexImport
      parentRoute: typeof DashboardBillsLayoutImport
    }
    '/dashboard/payments/': {
      id: '/dashboard/payments/'
      path: '/payments'
      fullPath: '/dashboard/payments'
      preLoaderRoute: typeof DashboardPaymentsIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/shops/': {
      id: '/dashboard/shops/'
      path: '/shops'
      fullPath: '/dashboard/shops'
      preLoaderRoute: typeof DashboardShopsIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/staff/': {
      id: '/dashboard/staff/'
      path: '/staff'
      fullPath: '/dashboard/staff'
      preLoaderRoute: typeof DashboardStaffIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/tenants/': {
      id: '/dashboard/tenants/'
      path: '/tenants'
      fullPath: '/dashboard/tenants'
      preLoaderRoute: typeof DashboardTenantsIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/todos/': {
      id: '/dashboard/todos/'
      path: '/'
      fullPath: '/dashboard/todos/'
      preLoaderRoute: typeof DashboardTodosIndexImport
      parentRoute: typeof DashboardTodosLayoutImport
    }
    '/dashboard/bills/shopsbills/': {
      id: '/dashboard/bills/shopsbills/'
      path: '/shopsbills'
      fullPath: '/dashboard/bills/shopsbills'
      preLoaderRoute: typeof DashboardBillsShopsbillsIndexImport
      parentRoute: typeof DashboardBillsLayoutImport
    }
    '/dashboard/shops/$shop/': {
      id: '/dashboard/shops/$shop/'
      path: '/shops/$shop'
      fullPath: '/dashboard/shops/$shop'
      preLoaderRoute: typeof DashboardShopsShopIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/staff/$staff/': {
      id: '/dashboard/staff/$staff/'
      path: '/staff/$staff'
      fullPath: '/dashboard/staff/$staff'
      preLoaderRoute: typeof DashboardStaffStaffIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/tenants/$tenant/': {
      id: '/dashboard/tenants/$tenant/'
      path: '/tenants/$tenant'
      fullPath: '/dashboard/tenants/$tenant'
      preLoaderRoute: typeof DashboardTenantsTenantIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/todos/$todos/': {
      id: '/dashboard/todos/$todos/'
      path: '/$todos'
      fullPath: '/dashboard/todos/$todos'
      preLoaderRoute: typeof DashboardTodosTodosIndexImport
      parentRoute: typeof DashboardTodosLayoutImport
    }
    '/dashboard/todos/tracking/': {
      id: '/dashboard/todos/tracking/'
      path: '/tracking'
      fullPath: '/dashboard/todos/tracking'
      preLoaderRoute: typeof DashboardTodosTrackingIndexImport
      parentRoute: typeof DashboardTodosLayoutImport
    }
    '/dashboard/bills/shopsbills/$shopsbills/': {
      id: '/dashboard/bills/shopsbills/$shopsbills/'
      path: '/shopsbills/$shopsbills'
      fullPath: '/dashboard/bills/shopsbills/$shopsbills'
      preLoaderRoute: typeof DashboardBillsShopsbillsShopsbillsIndexImport
      parentRoute: typeof DashboardBillsLayoutImport
    }
    '/dashboard/todos/tracking/$tracking/': {
      id: '/dashboard/todos/tracking/$tracking/'
      path: '/tracking/$tracking'
      fullPath: '/dashboard/todos/tracking/$tracking'
      preLoaderRoute: typeof DashboardTodosTrackingTrackingIndexImport
      parentRoute: typeof DashboardTodosLayoutImport
    }
    '/dashboard/todos/tracking/load/': {
      id: '/dashboard/todos/tracking/load/'
      path: '/tracking/load'
      fullPath: '/dashboard/todos/tracking/load'
      preLoaderRoute: typeof DashboardTodosTrackingLoadIndexImport
      parentRoute: typeof DashboardTodosLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthSignupRoute: typeof AuthSignupRoute
  AuthIndexRoute: typeof AuthIndexRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthSignupRoute: AuthSignupRoute,
  AuthIndexRoute: AuthIndexRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

interface DashboardBillsLayoutRouteChildren {
  DashboardBillsPrintRoute: typeof DashboardBillsPrintRoute
  DashboardBillsIndexRoute: typeof DashboardBillsIndexRoute
  DashboardBillsShopsbillsIndexRoute: typeof DashboardBillsShopsbillsIndexRoute
  DashboardBillsShopsbillsShopsbillsIndexRoute: typeof DashboardBillsShopsbillsShopsbillsIndexRoute
}

const DashboardBillsLayoutRouteChildren: DashboardBillsLayoutRouteChildren = {
  DashboardBillsPrintRoute: DashboardBillsPrintRoute,
  DashboardBillsIndexRoute: DashboardBillsIndexRoute,
  DashboardBillsShopsbillsIndexRoute: DashboardBillsShopsbillsIndexRoute,
  DashboardBillsShopsbillsShopsbillsIndexRoute:
    DashboardBillsShopsbillsShopsbillsIndexRoute,
}

const DashboardBillsLayoutRouteWithChildren =
  DashboardBillsLayoutRoute._addFileChildren(DashboardBillsLayoutRouteChildren)

interface DashboardTodosLayoutRouteChildren {
  DashboardTodosIndexRoute: typeof DashboardTodosIndexRoute
  DashboardTodosTodosIndexRoute: typeof DashboardTodosTodosIndexRoute
  DashboardTodosTrackingIndexRoute: typeof DashboardTodosTrackingIndexRoute
  DashboardTodosTrackingTrackingIndexRoute: typeof DashboardTodosTrackingTrackingIndexRoute
  DashboardTodosTrackingLoadIndexRoute: typeof DashboardTodosTrackingLoadIndexRoute
}

const DashboardTodosLayoutRouteChildren: DashboardTodosLayoutRouteChildren = {
  DashboardTodosIndexRoute: DashboardTodosIndexRoute,
  DashboardTodosTodosIndexRoute: DashboardTodosTodosIndexRoute,
  DashboardTodosTrackingIndexRoute: DashboardTodosTrackingIndexRoute,
  DashboardTodosTrackingTrackingIndexRoute:
    DashboardTodosTrackingTrackingIndexRoute,
  DashboardTodosTrackingLoadIndexRoute: DashboardTodosTrackingLoadIndexRoute,
}

const DashboardTodosLayoutRouteWithChildren =
  DashboardTodosLayoutRoute._addFileChildren(DashboardTodosLayoutRouteChildren)

interface DashboardLayoutRouteChildren {
  DashboardBillsLayoutRoute: typeof DashboardBillsLayoutRouteWithChildren
  DashboardTodosLayoutRoute: typeof DashboardTodosLayoutRouteWithChildren
  DashboardIndexRoute: typeof DashboardIndexRoute
  DashboardPaymentsIndexRoute: typeof DashboardPaymentsIndexRoute
  DashboardShopsIndexRoute: typeof DashboardShopsIndexRoute
  DashboardStaffIndexRoute: typeof DashboardStaffIndexRoute
  DashboardTenantsIndexRoute: typeof DashboardTenantsIndexRoute
  DashboardShopsShopIndexRoute: typeof DashboardShopsShopIndexRoute
  DashboardStaffStaffIndexRoute: typeof DashboardStaffStaffIndexRoute
  DashboardTenantsTenantIndexRoute: typeof DashboardTenantsTenantIndexRoute
}

const DashboardLayoutRouteChildren: DashboardLayoutRouteChildren = {
  DashboardBillsLayoutRoute: DashboardBillsLayoutRouteWithChildren,
  DashboardTodosLayoutRoute: DashboardTodosLayoutRouteWithChildren,
  DashboardIndexRoute: DashboardIndexRoute,
  DashboardPaymentsIndexRoute: DashboardPaymentsIndexRoute,
  DashboardShopsIndexRoute: DashboardShopsIndexRoute,
  DashboardStaffIndexRoute: DashboardStaffIndexRoute,
  DashboardTenantsIndexRoute: DashboardTenantsIndexRoute,
  DashboardShopsShopIndexRoute: DashboardShopsShopIndexRoute,
  DashboardStaffStaffIndexRoute: DashboardStaffStaffIndexRoute,
  DashboardTenantsTenantIndexRoute: DashboardTenantsTenantIndexRoute,
}

const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren,
)

interface ProfileLayoutRouteChildren {
  ProfileIndexRoute: typeof ProfileIndexRoute
}

const ProfileLayoutRouteChildren: ProfileLayoutRouteChildren = {
  ProfileIndexRoute: ProfileIndexRoute,
}

const ProfileLayoutRouteWithChildren = ProfileLayoutRoute._addFileChildren(
  ProfileLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/profile': typeof ProfileLayoutRouteWithChildren
  '/dashboard/bills': typeof DashboardBillsLayoutRouteWithChildren
  '/dashboard/todos': typeof DashboardTodosLayoutRouteWithChildren
  '/auth/signup': typeof AuthSignupRoute
  '/auth/': typeof AuthIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/profile/': typeof ProfileIndexRoute
  '/dashboard/bills/print': typeof DashboardBillsPrintRoute
  '/dashboard/bills/': typeof DashboardBillsIndexRoute
  '/dashboard/payments': typeof DashboardPaymentsIndexRoute
  '/dashboard/shops': typeof DashboardShopsIndexRoute
  '/dashboard/staff': typeof DashboardStaffIndexRoute
  '/dashboard/tenants': typeof DashboardTenantsIndexRoute
  '/dashboard/todos/': typeof DashboardTodosIndexRoute
  '/dashboard/bills/shopsbills': typeof DashboardBillsShopsbillsIndexRoute
  '/dashboard/shops/$shop': typeof DashboardShopsShopIndexRoute
  '/dashboard/staff/$staff': typeof DashboardStaffStaffIndexRoute
  '/dashboard/tenants/$tenant': typeof DashboardTenantsTenantIndexRoute
  '/dashboard/todos/$todos': typeof DashboardTodosTodosIndexRoute
  '/dashboard/todos/tracking': typeof DashboardTodosTrackingIndexRoute
  '/dashboard/bills/shopsbills/$shopsbills': typeof DashboardBillsShopsbillsShopsbillsIndexRoute
  '/dashboard/todos/tracking/$tracking': typeof DashboardTodosTrackingTrackingIndexRoute
  '/dashboard/todos/tracking/load': typeof DashboardTodosTrackingLoadIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth': typeof AuthIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/dashboard/bills/print': typeof DashboardBillsPrintRoute
  '/dashboard/bills': typeof DashboardBillsIndexRoute
  '/dashboard/payments': typeof DashboardPaymentsIndexRoute
  '/dashboard/shops': typeof DashboardShopsIndexRoute
  '/dashboard/staff': typeof DashboardStaffIndexRoute
  '/dashboard/tenants': typeof DashboardTenantsIndexRoute
  '/dashboard/todos': typeof DashboardTodosIndexRoute
  '/dashboard/bills/shopsbills': typeof DashboardBillsShopsbillsIndexRoute
  '/dashboard/shops/$shop': typeof DashboardShopsShopIndexRoute
  '/dashboard/staff/$staff': typeof DashboardStaffStaffIndexRoute
  '/dashboard/tenants/$tenant': typeof DashboardTenantsTenantIndexRoute
  '/dashboard/todos/$todos': typeof DashboardTodosTodosIndexRoute
  '/dashboard/todos/tracking': typeof DashboardTodosTrackingIndexRoute
  '/dashboard/bills/shopsbills/$shopsbills': typeof DashboardBillsShopsbillsShopsbillsIndexRoute
  '/dashboard/todos/tracking/$tracking': typeof DashboardTodosTrackingTrackingIndexRoute
  '/dashboard/todos/tracking/load': typeof DashboardTodosTrackingLoadIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/profile': typeof ProfileLayoutRouteWithChildren
  '/dashboard/bills': typeof DashboardBillsLayoutRouteWithChildren
  '/dashboard/todos': typeof DashboardTodosLayoutRouteWithChildren
  '/auth/signup': typeof AuthSignupRoute
  '/auth/': typeof AuthIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/profile/': typeof ProfileIndexRoute
  '/dashboard/bills/print': typeof DashboardBillsPrintRoute
  '/dashboard/bills/': typeof DashboardBillsIndexRoute
  '/dashboard/payments/': typeof DashboardPaymentsIndexRoute
  '/dashboard/shops/': typeof DashboardShopsIndexRoute
  '/dashboard/staff/': typeof DashboardStaffIndexRoute
  '/dashboard/tenants/': typeof DashboardTenantsIndexRoute
  '/dashboard/todos/': typeof DashboardTodosIndexRoute
  '/dashboard/bills/shopsbills/': typeof DashboardBillsShopsbillsIndexRoute
  '/dashboard/shops/$shop/': typeof DashboardShopsShopIndexRoute
  '/dashboard/staff/$staff/': typeof DashboardStaffStaffIndexRoute
  '/dashboard/tenants/$tenant/': typeof DashboardTenantsTenantIndexRoute
  '/dashboard/todos/$todos/': typeof DashboardTodosTodosIndexRoute
  '/dashboard/todos/tracking/': typeof DashboardTodosTrackingIndexRoute
  '/dashboard/bills/shopsbills/$shopsbills/': typeof DashboardBillsShopsbillsShopsbillsIndexRoute
  '/dashboard/todos/tracking/$tracking/': typeof DashboardTodosTrackingTrackingIndexRoute
  '/dashboard/todos/tracking/load/': typeof DashboardTodosTrackingLoadIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/profile'
    | '/dashboard/bills'
    | '/dashboard/todos'
    | '/auth/signup'
    | '/auth/'
    | '/dashboard/'
    | '/profile/'
    | '/dashboard/bills/print'
    | '/dashboard/bills/'
    | '/dashboard/payments'
    | '/dashboard/shops'
    | '/dashboard/staff'
    | '/dashboard/tenants'
    | '/dashboard/todos/'
    | '/dashboard/bills/shopsbills'
    | '/dashboard/shops/$shop'
    | '/dashboard/staff/$staff'
    | '/dashboard/tenants/$tenant'
    | '/dashboard/todos/$todos'
    | '/dashboard/todos/tracking'
    | '/dashboard/bills/shopsbills/$shopsbills'
    | '/dashboard/todos/tracking/$tracking'
    | '/dashboard/todos/tracking/load'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth/signup'
    | '/auth'
    | '/dashboard'
    | '/profile'
    | '/dashboard/bills/print'
    | '/dashboard/bills'
    | '/dashboard/payments'
    | '/dashboard/shops'
    | '/dashboard/staff'
    | '/dashboard/tenants'
    | '/dashboard/todos'
    | '/dashboard/bills/shopsbills'
    | '/dashboard/shops/$shop'
    | '/dashboard/staff/$staff'
    | '/dashboard/tenants/$tenant'
    | '/dashboard/todos/$todos'
    | '/dashboard/todos/tracking'
    | '/dashboard/bills/shopsbills/$shopsbills'
    | '/dashboard/todos/tracking/$tracking'
    | '/dashboard/todos/tracking/load'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/dashboard'
    | '/profile'
    | '/dashboard/bills'
    | '/dashboard/todos'
    | '/auth/signup'
    | '/auth/'
    | '/dashboard/'
    | '/profile/'
    | '/dashboard/bills/print'
    | '/dashboard/bills/'
    | '/dashboard/payments/'
    | '/dashboard/shops/'
    | '/dashboard/staff/'
    | '/dashboard/tenants/'
    | '/dashboard/todos/'
    | '/dashboard/bills/shopsbills/'
    | '/dashboard/shops/$shop/'
    | '/dashboard/staff/$staff/'
    | '/dashboard/tenants/$tenant/'
    | '/dashboard/todos/$todos/'
    | '/dashboard/todos/tracking/'
    | '/dashboard/bills/shopsbills/$shopsbills/'
    | '/dashboard/todos/tracking/$tracking/'
    | '/dashboard/todos/tracking/load/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
  DashboardLayoutRoute: typeof DashboardLayoutRouteWithChildren
  ProfileLayoutRoute: typeof ProfileLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
  ProfileLayoutRoute: ProfileLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/dashboard",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth/layout.tsx",
      "children": [
        "/auth/signup",
        "/auth/"
      ]
    },
    "/dashboard": {
      "filePath": "dashboard/layout.tsx",
      "children": [
        "/dashboard/bills",
        "/dashboard/todos",
        "/dashboard/",
        "/dashboard/payments/",
        "/dashboard/shops/",
        "/dashboard/staff/",
        "/dashboard/tenants/",
        "/dashboard/shops/$shop/",
        "/dashboard/staff/$staff/",
        "/dashboard/tenants/$tenant/"
      ]
    },
    "/profile": {
      "filePath": "profile/layout.tsx",
      "children": [
        "/profile/"
      ]
    },
    "/dashboard/bills": {
      "filePath": "dashboard/bills/layout.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/bills/print",
        "/dashboard/bills/",
        "/dashboard/bills/shopsbills/",
        "/dashboard/bills/shopsbills/$shopsbills/"
      ]
    },
    "/dashboard/todos": {
      "filePath": "dashboard/todos/layout.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/todos/",
        "/dashboard/todos/$todos/",
        "/dashboard/todos/tracking/",
        "/dashboard/todos/tracking/$tracking/",
        "/dashboard/todos/tracking/load/"
      ]
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx",
      "parent": "/auth"
    },
    "/auth/": {
      "filePath": "auth/index.tsx",
      "parent": "/auth"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    },
    "/profile/": {
      "filePath": "profile/index.tsx",
      "parent": "/profile"
    },
    "/dashboard/bills/print": {
      "filePath": "dashboard/bills/print.tsx",
      "parent": "/dashboard/bills"
    },
    "/dashboard/bills/": {
      "filePath": "dashboard/bills/index.tsx",
      "parent": "/dashboard/bills"
    },
    "/dashboard/payments/": {
      "filePath": "dashboard/payments/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/shops/": {
      "filePath": "dashboard/shops/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/staff/": {
      "filePath": "dashboard/staff/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/tenants/": {
      "filePath": "dashboard/tenants/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/todos/": {
      "filePath": "dashboard/todos/index.tsx",
      "parent": "/dashboard/todos"
    },
    "/dashboard/bills/shopsbills/": {
      "filePath": "dashboard/bills/shopsbills/index.tsx",
      "parent": "/dashboard/bills"
    },
    "/dashboard/shops/$shop/": {
      "filePath": "dashboard/shops/$shop/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/staff/$staff/": {
      "filePath": "dashboard/staff/$staff/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/tenants/$tenant/": {
      "filePath": "dashboard/tenants/$tenant/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/todos/$todos/": {
      "filePath": "dashboard/todos/$todos/index.tsx",
      "parent": "/dashboard/todos"
    },
    "/dashboard/todos/tracking/": {
      "filePath": "dashboard/todos/tracking/index.tsx",
      "parent": "/dashboard/todos"
    },
    "/dashboard/bills/shopsbills/$shopsbills/": {
      "filePath": "dashboard/bills/shopsbills/$shopsbills/index.tsx",
      "parent": "/dashboard/bills"
    },
    "/dashboard/todos/tracking/$tracking/": {
      "filePath": "dashboard/todos/tracking/$tracking/index.tsx",
      "parent": "/dashboard/todos"
    },
    "/dashboard/todos/tracking/load/": {
      "filePath": "dashboard/todos/tracking/load/index.tsx",
      "parent": "/dashboard/todos"
    }
  }
}
ROUTE_MANIFEST_END */
