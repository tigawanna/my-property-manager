import { createFileRoute } from '@tanstack/react-router'
import { OneShopPage } from '../-components/oneshop/OneShopPage';

export const Route = createFileRoute("/dashboard/shops/$shop/")({
  component: OneShopPage,
});
