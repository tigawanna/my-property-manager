import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

export function DashboardPage(){
return (
 <div className='w-full min-h-screen h-full flex flex-col items-center justify-center'>
  <h1 className='text-2xl font-bold'>Dashboard</h1>
 </div>
);
}
