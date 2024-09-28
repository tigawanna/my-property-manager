import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tenants/$tenant/')({
  component: () => <div>Hello /dashboard/tenants/$tenant/!</div>,
})
