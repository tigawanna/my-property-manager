import { useRouterState } from "@tanstack/react-router";
import Nprogress from "./nprogress/Nprogress";
import { NavbarRoutes } from "./NavbarRoutes";
import { ThemeToggle } from "./ThemeToggle";
import { CurrentUser } from "./CurrentUser";

interface MainNavbarProps {}

export function MainNavbar({}: MainNavbarProps) {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <nav className="sticky top-0 z-30 flex h-14 w-full flex-col items-center justify-between bg-base-200">
      <div className="flex h-full w-full items-center justify-between gap-2 px-2 pr-5">
        <NavbarRoutes />
        <ThemeToggle />
        <CurrentUser />
      </div>
      <Nprogress isAnimating={isLoading} />
    </nav>
  );
}
