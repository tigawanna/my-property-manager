
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">Welcome Home!</h3>
    </div>
  )
}
