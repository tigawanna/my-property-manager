
import { createFileRoute } from '@tanstack/react-router'
import { OneTrackingPage } from '@/routes/dashboard/todos/tracking/-components/onetracking/OneTrackingPage'

export const Route = createFileRoute('/dashboard/todos/tracking/$tracking/')({
  component: OneTrackingPage
})

  