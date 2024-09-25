import { MainNavbar } from "@/components/navigation/MainNavbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useSearch } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";


export function RootComponent() {
    const searchparams = useSearch({
        from:"__root__"
    })

  return (
    <div className="min-h-screen w-full" data-theme={searchparams.theme??"light"}>
      <MainNavbar />
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
      <Toaster reverseOrder/>
    </div>
  );
}
