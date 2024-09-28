import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "./-components/DashboardPage";
import { authGuard } from "@/lib/tanstack/query/use-viewer";

export const Route = createFileRoute("/dashboard/")({
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
  component: DashboardPage,
});

