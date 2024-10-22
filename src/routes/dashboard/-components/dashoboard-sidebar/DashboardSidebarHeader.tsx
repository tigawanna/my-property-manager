import { Castle, LayoutDashboard } from "lucide-react";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { Link } from "@tanstack/react-router";
interface DashboardSidebarHeaderProps {}

export function DashboardSidebarHeader({}: DashboardSidebarHeaderProps) {
  const { state } = useSidebar();
    return (
      <div className=" flex flex-col gap-3">
        <Link
          to="/"
          className="flex py-4 w-full items-center justify-center border-b border-primary hover:bg-primary/20"
        >
          <Castle className="size-14" />
        </Link>
        <Link
          to="/dashboard"
          className="flex cursor-pointer items-center gap-2 p-1  underline-offset-2 hover:underline"
        >
          <LayoutDashboard />
          {state === "expanded" && (
            <h1 className="text-xl font-bold">Dashboard</h1>
          )}
        </Link>
      </div>
    );
}
