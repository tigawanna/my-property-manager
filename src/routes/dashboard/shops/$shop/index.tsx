import { createFileRoute } from '@tanstack/react-router'
import { OneShopPage } from '../-components/oneshop/OneShopPage';
import { z } from 'zod';
import { authGuard } from '@/lib/tanstack/query/use-viewer';
const searchparams = z.object({
  cy: z.number().optional(),

});
export const Route = createFileRoute("/dashboard/shops/$shop/")({
  component: OneShopPage,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    // @ts-expect-error
    await authGuard({ ctx });
  },
});
