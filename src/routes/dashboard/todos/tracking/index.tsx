import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/todos/tracking/')({
  component: () => <div>Hello /dashboard/todos/tracking/!</div>,
})
