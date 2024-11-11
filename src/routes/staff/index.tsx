import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/staff/')({
  component: () => <div>Hello /staff/!</div>,
})
