import { RouterProvider as TanStackRouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import { queryClient } from '../config/queryClient'

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function RouterProvider() {
  return <TanStackRouterProvider router={router} />
}
