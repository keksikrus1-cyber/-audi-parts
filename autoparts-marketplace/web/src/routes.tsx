import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

import { AppPage, HomePage, RootLayout } from './pages'
import { CatalogPage } from './components/catalog/CatalogPage'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: AppPage,
})

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogPage,
})

const modelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/models',
  component: () => null,
})

const salvageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/salvage',
  component: () => null,
})

const stoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sto',
  component: () => null,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  appRoute,
  catalogRoute,
  modelsRoute,
  salvageRoute,
  stoRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
