import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { StaffPage } from "./-components/StaffPage";
import { authGuard } from "@/lib/tanstack/query/use-viewer";

const searchparams = z.object({
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/staff/")({
  validateSearch: (search) => searchparams.parse(search),
    async beforeLoad(ctx) {
     const context  = ctx as any
      await authGuard({ ctx:context });
    },
  component:StaffPage
});
