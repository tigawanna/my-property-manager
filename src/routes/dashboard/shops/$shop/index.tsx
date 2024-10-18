import { createFileRoute } from "@tanstack/react-router";
import { OneShopPage } from "../-components/oneshop/OneShopPage";
import { z } from "zod";
import { authGuard } from "@/lib/tanstack/query/use-viewer";
import { oneShopBillsQueryOptions } from "../-components/query-options/shops-query-options";
const searchparams = z.object({
  cy: z.number().optional(),
});
export const Route = createFileRoute("/dashboard/shops/$shop/")({
  component: OneShopPage,
  validateSearch: (search) => searchparams.parse(search),
  loader(ctx) {
    const { shop } = ctx.params;
    const {cy} = ctx.location.search as Record<string, string>;
    const selectedYear = isNaN(Number(cy))? new Date().getFullYear():Number(cy)
    ctx.context.queryClient.ensureQueryData(
      oneShopBillsQueryOptions({ shop, year: selectedYear }),
    );
  },
  async beforeLoad(ctx) {
    // @ts-expect-error
    await authGuard({ ctx });
  },
});
