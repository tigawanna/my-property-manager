import { createFileRoute } from '@tanstack/react-router'
import { ToDosLayout } from './-components/ToDosLayout'

export const Route = createFileRoute('/dashboard/todos')({
  component:ToDosLayout,
})
