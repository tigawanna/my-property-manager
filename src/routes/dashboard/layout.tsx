import { createFileRoute } from '@tanstack/react-router'
import { DashboardSidebar } from './-components/dashoboard-sidebar/DashboardSidebar';

export const Route = createFileRoute("/dashboard")({
  component: DashboardSidebar,
});
