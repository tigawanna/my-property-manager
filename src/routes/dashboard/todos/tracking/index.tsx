import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { TrackingPage } from './-components/TrackingPage';

const searchparams = z.object({
  sq: z.string().optional(),

});
export const Route = createFileRoute('/dashboard/todos/tracking/')({
  component: TrackingPage,
  validateSearch: (search) => searchparams.parse(search),
})
