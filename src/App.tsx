import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UnitProvider } from './contexts/UnitContext'
import { Dashboard } from './components/Dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnitProvider>
        <Dashboard />
      </UnitProvider>
    </QueryClientProvider>
  )
}

export default App
