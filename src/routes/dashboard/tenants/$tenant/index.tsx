import { createFileRoute } from "@tanstack/react-router";
import { OneTenantPage } from "../-components/one-tenant/OneTenantPage";
import { authGuard } from "@/lib/tanstack/query/use-viewer";

export const Route = createFileRoute("/dashboard/tenants/$tenant/")({
  component: OneTenantPage,
  async beforeLoad(ctx) {
    // @ts-expect-error
    await authGuard({ ctx });
  },
});
