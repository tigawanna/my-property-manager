import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles.css"
import { PocketBaseClient } from '@/lib/pb/client';
import { PropertyUserResponse } from '@/lib/pb/database';
import { QueryClient } from '@tanstack/react-query';
import { RecordAuthResponse } from 'pocketbase';

export const Route = createRootRouteWithContext<{
  pb: PocketBaseClient;
  queryClient: QueryClient;
  viewer?:
    | RecordAuthResponse<PropertyUserResponse>
    | { record: null; token: null };
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="w-full min-h-screen ">
      <div className="bg-base-200 w-full  p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}>
          Home
        </Link>{" "}
        <Link
          to="/dashboard"
          activeProps={{
            className: "font-bold",
          }}>
          Dashboard
        </Link>
      </div>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  );
}
