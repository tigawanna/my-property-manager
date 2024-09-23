import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles.css"
import { PocketBaseClient } from '@/lib/pb/client';
import { QueryClient } from '@tanstack/react-query';
import { PocketbaseViewerType } from '@/lib/tanstack/query/use-viewer';
import { MainNavbar } from '@/components/navigation/MainNavbar';

export const Route = createRootRouteWithContext<{
  pb: PocketBaseClient;
  queryClient: QueryClient;
  viewer?: PocketbaseViewerType;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="w-full min-h-screen ">
      <MainNavbar/>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  );
}
