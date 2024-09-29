import { authGuard } from "@/lib/tanstack/query/use-viewer";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import PrintBillsContainerBills from "./-components/print/PrintBillsContainer";
import { RouterErrorComponent } from "@/lib/tanstack/router/routerErrorComponent";
const searchparams = z.object({
  cy: z.number().optional(),
  cm: z.number().optional(),
  py: z.number().optional(),
  pm: z.number().optional(),
});
export const Route = createFileRoute("/dashboard/bills/print")({
  component: PrintBillsContainerBills,
  validateSearch: (search) => searchparams.parse(search),
  errorComponent: ({ error }) => <RouterErrorComponent error={error} />,
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
});
