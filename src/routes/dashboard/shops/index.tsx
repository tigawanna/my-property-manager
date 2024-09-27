import { createFileRoute } from '@tanstack/react-router'
import { ShopsPage } from './-components/ShopsPage'
import { z } from 'zod';

const searchparams = z.object({
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/shops/")({
  validateSearch: (search) => searchparams.parse(search),
  component: ShopsPage,
});
