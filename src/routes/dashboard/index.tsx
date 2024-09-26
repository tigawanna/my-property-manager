import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "./-components/DashboardPage";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

