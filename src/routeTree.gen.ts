/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as ListIndexImport } from './routes/list/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as ListItemIndexImport } from './routes/list/$item/index'
import { Route as DashboardTenantsIndexImport } from './routes/dashboard/tenants/index'
import { Route as DashboardShopsIndexImport } from './routes/dashboard/shops/index'
import { Route as DashboardBillsIndexImport } from './routes/dashboard/bills/index'
import { Route as ListItemItemModalImport } from './routes/list/$item/item-modal'
import { Route as DashboardBillsPrintImport } from './routes/dashboard/bills/print'
import { Route as DashboardTenantsTenantIndexImport } from './routes/dashboard/tenants/$tenant/index'
import { Route as DashboardShopsShopIndexImport } from './routes/dashboard/shops/$shop/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const ListIndexRoute = ListIndexImport.update({
  path: '/list/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any)

const ListItemIndexRoute = ListItemIndexImport.update({
  path: '/list/$item/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardTenantsIndexRoute = DashboardTenantsIndexImport.update({
  path: '/dashboard/tenants/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardShopsIndexRoute = DashboardShopsIndexImport.update({
  path: '/dashboard/shops/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardBillsIndexRoute = DashboardBillsIndexImport.update({
  path: '/dashboard/bills/',
  getParentRoute: () => rootRoute,
} as any)

const ListItemItemModalRoute = ListItemItemModalImport.update({
  path: '/list/$item/item-modal',
  getParentRoute: () => rootRoute,
} as any)

const DashboardBillsPrintRoute = DashboardBillsPrintImport.update({
  path: '/dashboard/bills/print',
  getParentRoute: () => rootRoute,
} as any)

const DashboardTenantsTenantIndexRoute =
  DashboardTenantsTenantIndexImport.update({
    path: '/dashboard/tenants/$tenant/',
    getParentRoute: () => rootRoute,
  } as any)

const DashboardShopsShopIndexRoute = DashboardShopsShopIndexImport.update({
  path: '/dashboard/shops/$shop/',
  getParentRoute: () => rootRoute,
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
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/list/': {
      id: '/list/'
      path: '/list'
      fullPath: '/list'
      preLoaderRoute: typeof ListIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/bills/print': {
      id: '/dashboard/bills/print'
      path: '/dashboard/bills/print'
      fullPath: '/dashboard/bills/print'
      preLoaderRoute: typeof DashboardBillsPrintImport
      parentRoute: typeof rootRoute
    }
    '/list/$item/item-modal': {
      id: '/list/$item/item-modal'
      path: '/list/$item/item-modal'
      fullPath: '/list/$item/item-modal'
      preLoaderRoute: typeof ListItemItemModalImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/bills/': {
      id: '/dashboard/bills/'
      path: '/dashboard/bills'
      fullPath: '/dashboard/bills'
      preLoaderRoute: typeof DashboardBillsIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/shops/': {
      id: '/dashboard/shops/'
      path: '/dashboard/shops'
      fullPath: '/dashboard/shops'
      preLoaderRoute: typeof DashboardShopsIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/tenants/': {
      id: '/dashboard/tenants/'
      path: '/dashboard/tenants'
      fullPath: '/dashboard/tenants'
      preLoaderRoute: typeof DashboardTenantsIndexImport
      parentRoute: typeof rootRoute
    }
    '/list/$item/': {
      id: '/list/$item/'
      path: '/list/$item'
      fullPath: '/list/$item'
      preLoaderRoute: typeof ListItemIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/shops/$shop/': {
      id: '/dashboard/shops/$shop/'
      path: '/dashboard/shops/$shop'
      fullPath: '/dashboard/shops/$shop'
      preLoaderRoute: typeof DashboardShopsShopIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/tenants/$tenant/': {
      id: '/dashboard/tenants/$tenant/'
      path: '/dashboard/tenants/$tenant'
      fullPath: '/dashboard/tenants/$tenant'
      preLoaderRoute: typeof DashboardTenantsTenantIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth': typeof AuthIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/list': typeof ListIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/dashboard/bills/print': typeof DashboardBillsPrintRoute
  '/list/$item/item-modal': typeof ListItemItemModalRoute
  '/dashboard/bills': typeof DashboardBillsIndexRoute
  '/dashboard/shops': typeof DashboardShopsIndexRoute
  '/dashboard/tenants': typeof DashboardTenantsIndexRoute
  '/list/$item': typeof ListItemIndexRoute
  '/dashboard/shops/$shop': typeof DashboardShopsShopIndexRoute
  '/dashboard/tenants/$tenant': typeof DashboardTenantsTenantIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth': typeof AuthIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/list': typeof ListIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/dashboard/bills/print': typeof DashboardBillsPrintRoute
  '/list/$item/item-modal': typeof ListItemItemModalRoute
  '/dashboard/bills': typeof DashboardBillsIndexRoute
  '/dashboard/shops': typeof DashboardShopsIndexRoute
  '/dashboard/tenants': typeof DashboardTenantsIndexRoute
  '/list/$item': typeof ListItemIndexRoute
  '/dashboard/shops/$shop': typeof DashboardShopsShopIndexRoute
  '/dashboard/tenants/$tenant': typeof DashboardTenantsTenantIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth/': typeof AuthIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/list/': typeof ListIndexRoute
  '/profile/': typeof ProfileIndexRoute
  '/dashboard/bills/print': typeof DashboardBillsPrintRoute
  '/list/$item/item-modal': typeof ListItemItemModalRoute
  '/dashboard/bills/': typeof DashboardBillsIndexRoute
  '/dashboard/shops/': typeof DashboardShopsIndexRoute
  '/dashboard/tenants/': typeof DashboardTenantsIndexRoute
  '/list/$item/': typeof ListItemIndexRoute
  '/dashboard/shops/$shop/': typeof DashboardShopsShopIndexRoute
  '/dashboard/tenants/$tenant/': typeof DashboardTenantsTenantIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth/signup'
    | '/auth'
    | '/dashboard'
    | '/list'
    | '/profile'
    | '/dashboard/bills/print'
    | '/list/$item/item-modal'
    | '/dashboard/bills'
    | '/dashboard/shops'
    | '/dashboard/tenants'
    | '/list/$item'
    | '/dashboard/shops/$shop'
    | '/dashboard/tenants/$tenant'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth/signup'
    | '/auth'
    | '/dashboard'
    | '/list'
    | '/profile'
    | '/dashboard/bills/print'
    | '/list/$item/item-modal'
    | '/dashboard/bills'
    | '/dashboard/shops'
    | '/dashboard/tenants'
    | '/list/$item'
    | '/dashboard/shops/$shop'
    | '/dashboard/tenants/$tenant'
  id:
    | '__root__'
    | '/'
    | '/auth/signup'
    | '/auth/'
    | '/dashboard/'
    | '/list/'
    | '/profile/'
    | '/dashboard/bills/print'
    | '/list/$item/item-modal'
    | '/dashboard/bills/'
    | '/dashboard/shops/'
    | '/dashboard/tenants/'
    | '/list/$item/'
    | '/dashboard/shops/$shop/'
    | '/dashboard/tenants/$tenant/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthSignupRoute: typeof AuthSignupRoute
  AuthIndexRoute: typeof AuthIndexRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  ListIndexRoute: typeof ListIndexRoute
  ProfileIndexRoute: typeof ProfileIndexRoute
  DashboardBillsPrintRoute: typeof DashboardBillsPrintRoute
  ListItemItemModalRoute: typeof ListItemItemModalRoute
  DashboardBillsIndexRoute: typeof DashboardBillsIndexRoute
  DashboardShopsIndexRoute: typeof DashboardShopsIndexRoute
  DashboardTenantsIndexRoute: typeof DashboardTenantsIndexRoute
  ListItemIndexRoute: typeof ListItemIndexRoute
  DashboardShopsShopIndexRoute: typeof DashboardShopsShopIndexRoute
  DashboardTenantsTenantIndexRoute: typeof DashboardTenantsTenantIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthSignupRoute: AuthSignupRoute,
  AuthIndexRoute: AuthIndexRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  ListIndexRoute: ListIndexRoute,
  ProfileIndexRoute: ProfileIndexRoute,
  DashboardBillsPrintRoute: DashboardBillsPrintRoute,
  ListItemItemModalRoute: ListItemItemModalRoute,
  DashboardBillsIndexRoute: DashboardBillsIndexRoute,
  DashboardShopsIndexRoute: DashboardShopsIndexRoute,
  DashboardTenantsIndexRoute: DashboardTenantsIndexRoute,
  ListItemIndexRoute: ListItemIndexRoute,
  DashboardShopsShopIndexRoute: DashboardShopsShopIndexRoute,
  DashboardTenantsTenantIndexRoute: DashboardTenantsTenantIndexRoute,
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
        "/auth/signup",
        "/auth/",
        "/dashboard/",
        "/list/",
        "/profile/",
        "/dashboard/bills/print",
        "/list/$item/item-modal",
        "/dashboard/bills/",
        "/dashboard/shops/",
        "/dashboard/tenants/",
        "/list/$item/",
        "/dashboard/shops/$shop/",
        "/dashboard/tenants/$tenant/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx"
    },
    "/auth/": {
      "filePath": "auth/index.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/list/": {
      "filePath": "list/index.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.tsx"
    },
    "/dashboard/bills/print": {
      "filePath": "dashboard/bills/print.tsx"
    },
    "/list/$item/item-modal": {
      "filePath": "list/$item/item-modal.tsx"
    },
    "/dashboard/bills/": {
      "filePath": "dashboard/bills/index.tsx"
    },
    "/dashboard/shops/": {
      "filePath": "dashboard/shops/index.tsx"
    },
    "/dashboard/tenants/": {
      "filePath": "dashboard/tenants/index.tsx"
    },
    "/list/$item/": {
      "filePath": "list/$item/index.tsx"
    },
    "/dashboard/shops/$shop/": {
      "filePath": "dashboard/shops/$shop/index.tsx"
    },
    "/dashboard/tenants/$tenant/": {
      "filePath": "dashboard/tenants/$tenant/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
