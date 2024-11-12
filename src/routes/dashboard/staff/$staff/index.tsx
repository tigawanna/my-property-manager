import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/staff/$staff/')({
  component: () => <div>Hello /dashboard/staff/$staff/!</div>,
})
