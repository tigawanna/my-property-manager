import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: () => {
    return (
      <div>
        <h1 className='text-4xl'>Dashboard</h1>
        <Outlet/>
      </div>
    )
  },
})
