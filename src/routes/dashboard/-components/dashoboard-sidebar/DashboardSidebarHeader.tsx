import { Castle, LayoutDashboard } from "lucide-react";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
interface DashboardSidebarHeaderProps {}

export function DashboardSidebarHeader({}: DashboardSidebarHeaderProps) {
  const { state,setOpenMobile } = useSidebar();
    const { pathname } = useLocation();
    return (
      <div className="flex flex-col gap-3" onClick={() => {setOpenMobile(false)}}>
        <Link
          to="/"
          className="flex w-full items-center justify-center border-b border-primary py-4 hover:bg-primary/20"
        >
          <Castle className="size-14" />
        </Link>
        <Link
          to="/dashboard"
          className={
            pathname === "/dashboard"
              ? `glass flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-primary/60 p-1 underline-offset-2 hover:underline`
              : `flex w-full cursor-pointer items-center gap-2 rounded-sm p-1 underline-offset-2 hover:bg-base-300 hover:underline`
          }

        >
          <LayoutDashboard />
          {state === "expanded" && (
            <h1 className="text-xl font-bold">Dashboard</h1>
          )}
        </Link>
      </div>
    );
}
