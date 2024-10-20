import { Link, useRouterState } from "@tanstack/react-router";
import Nprogress from "./nprogress/Nprogress";
// import { NavbarRoutes } from "./NavbarRoutes";
import { ThemeToggle } from "./ThemeToggle";
import { CurrentUser } from "./CurrentUser";
import { DashboardNavigationMenu } from "./DashboardNavigationMenu";
import { Castle } from "lucide-react";

interface MainNavbarProps {}

export function MainNavbar({}: MainNavbarProps) {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <nav className="sticky top-0 z-30 flex  w-full flex-col items-center justify-between bg-base-200">
      {/* <div className="flex h-full w-full items-center justify-between gap-5 px-2 pr-5">
        <Link to="/" className="btn btn-link btn-sm">
          <Castle />
        </Link>
        <div className="w-full flex justify-end px-5">
        <DashboardNavigationMenu />
        </div>
        <ThemeToggle />
        </div> */}
      <Nprogress isAnimating={isLoading} />
    </nav>
  );
}
