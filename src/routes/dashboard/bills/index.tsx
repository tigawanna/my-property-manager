import { authGuard } from "@/lib/tanstack/query/use-viewer";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BillsPage } from "./-components/BillsPage";
import { getDefaultPeriod } from "./-components/api/use-bills-period";
import { RouterErrorComponent } from "@/lib/tanstack/router/routerErrorComponent";

const { curr_month, curr_year, prev_month, prev_year } = getDefaultPeriod();

const searchparams = z.object({
  cy: z.number().default(curr_year).optional(),
  cm: z.number().default(curr_month).optional(),
  py: z.number().default(prev_year).optional(),
  pm: z.number().default(prev_month).optional(),
  // month and year we're saving
  sm: z.number().default(prev_month).optional(),
  sy: z.number().default(prev_month).optional(),
  mode:z.enum(["create","update"]).default("create").optional(),
  bill: z.number().default(0).optional(),
});
export const Route = createFileRoute("/dashboard/bills/")({
  component: BillsPage,
  errorComponent: ({ error }) => <RouterErrorComponent error={error} />,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(context) {
    const ctx = context as any
    await authGuard({ ctx });
  },
});
