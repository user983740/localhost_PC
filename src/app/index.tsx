import { MantineProvider } from './providers/MantineProvider'
import { QueryProvider } from './providers/QueryProvider'
import { RouterProvider } from './providers/RouterProvider'
import './styles/global.css'

export function App() {
  return (
    <MantineProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </MantineProvider>
  )
}
