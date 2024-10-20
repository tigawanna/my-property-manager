import { LayoutDashboard } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
interface DashboardSidebarHeaderProps {}

export function DashboardSidebarHeader({}: DashboardSidebarHeaderProps) {
  const { state } = useSidebar();
    return (
    <Link
      to="/dashboard"
      className="flex cursor-pointer items-center gap-2 p-1 text-primary underline-offset-2 hover:underline"
    >
      <LayoutDashboard />
      {state === "expanded" && <h1 className="text-xl font-bold">Dashboard</h1>}
    </Link>
  );
}
