import { createFileRoute } from '@tanstack/react-router'
import { TrackingPage } from './-components/TrackingPage'

export const Route = createFileRoute('/dashboard/todos/tracking/')({
  component: TrackingPage,
})
