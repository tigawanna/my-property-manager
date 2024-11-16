import { createFileRoute } from '@tanstack/react-router'
import { TrackingPage } from './-components/TrackingPage'
import { z } from 'zod';

const searchparams = z.object({
  sq: z.string().optional(),

});
export const Route = createFileRoute('/dashboard/todos/tracking/')({
  component: TrackingPage,
  validateSearch: (search) => searchparams.parse(search),
})
