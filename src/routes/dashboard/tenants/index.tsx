import { createFileRoute } from '@tanstack/react-router'
import { TenantsPage } from './-components/TenantsPage'
import { z } from 'zod'
import { authGuard } from '@/lib/tanstack/query/use-viewer';
const searchparams = z.object({
  sq: z.string().optional(),
})
export const Route = createFileRoute("/dashboard/tenants/")({
  component: TenantsPage,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
});
