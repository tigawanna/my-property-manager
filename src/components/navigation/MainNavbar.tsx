import { useRouterState } from "@tanstack/react-router";
import Nprogress from "./nprogress/Nprogress";
import { NavbarRoutes } from "./NavbarRoutes";
import { ThemeToggle } from "./ThemeToggle";
import { CurrentUser } from "./CurrentUser";

interface MainNavbarProps {

}

export function MainNavbar({}:MainNavbarProps){
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

return (
  <nav className="sticky top-0 flex h-14 w-full bg-base-200  flex-col items-center justify-between">
    <div className="flex h-full w-full items-center justify-between px-1">
      <NavbarRoutes/>
      <ThemeToggle/>
    <CurrentUser/>
    </div>
    <Nprogress isAnimating={isLoading} />
    </nav>
);
}
