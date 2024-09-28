import { createFileRoute } from '@tanstack/react-router'
import { OneShopPage } from '../-components/oneshop/OneShopPage';
import { z } from 'zod';
const searchparams = z.object({
  cy: z.number().optional(),

});
export const Route = createFileRoute("/dashboard/shops/$shop/")({
  component: OneShopPage,
  validateSearch: (search) => searchparams.parse(search),
});
