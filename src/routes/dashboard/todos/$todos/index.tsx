
import { createFileRoute } from '@tanstack/react-router'
import { OneTodosPage } from '@/routes/dashboard/todos/-components/onetodos/OneTodosPage'

export const Route = createFileRoute('/dashboard/todos/$todos/')({
  component: OneTodosPage
})

  