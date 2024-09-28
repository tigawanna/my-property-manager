import { pb, PocketBaseClient } from "@/lib/pb/client";
import { PropertyUserResponse } from "@/lib/pb/database";
import {
  QueryClient,
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  AnyContext,
  BeforeLoadContextOptions,
  redirect,
  RootRoute,
} from "@tanstack/react-router";
import { RecordAuthResponse } from "pocketbase";

export const viewerqueryOptions = queryOptions({
  queryKey: ["viewer"],
  queryFn: () =>
    pb
      .from("property_user")
      .authRefresh()
      .then((res) => res)
      .catch(() => {
        pb.authStore.clear();
        return { record: null, token: null };
      }),
  staleTime: 1000 * 60 * 60,
});
export function useViewer() {
  const qc = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      pb.authStore.clear();
      qc.invalidateQueries(viewerqueryOptions);
    },
  });
  return { userQuery: useSuspenseQuery(viewerqueryOptions), logoutMutation };
}

export type PocketbaseViewerType =
  | RecordAuthResponse<PropertyUserResponse>
  | { record: null; token: null };

type AuthBeforeloadContext = BeforeLoadContextOptions<
  RootRoute<
    undefined,
    {
      pb: PocketBaseClient;
      queryClient: QueryClient;
      viewer?: PocketbaseViewerType;
    },
    AnyContext,
    AnyContext,
    {},
    undefined,
    unknown,
    unknown
  >,
  any,
  Record<never, string>,
  AnyContext,
  AnyContext
>;

interface AuthGuardProps {
  ctx: AuthBeforeloadContext;
  role?: "staff" | "tenant" | "user";
  reverse?: boolean;
}
export async function authGuard({ ctx, role, reverse }: AuthGuardProps) {
  const returnTo = ctx.search?.returnTo ?? "/";
  const user = ctx.context?.viewer;
  // console.log(" ============ user in ",ctx.location.pathname," guard =========== ", user);
  // console.log(" ============ user in ",ctx.location.pathname," guard =========== ", user?.record);

  if (!user?.record) {
    // console.log(" ++++++++ no user redirectiong to auth ++++++ ");
    throw redirect({
      to: "/auth",
      search: {
        returnTo: ctx.location.pathname,
      },
    });
  }
  // redirect beck if a user exists , to be used in auth routes
  if (reverse) {
    // console.log(" ++++++++ user exists in auth redirecting back ++++++ ");
    throw redirect({
      to: returnTo ?? "/",
    });
  }
  // redirect if not the right role
  if (role && user?.record?.role !== role) {
    // console.log(" ++++++++ user exists but wrong role redirecting back ++++++ ");
    throw redirect({
      to: returnTo ?? "/",
    });
  }
  // console.log(" ++++++++ fall through case user exists ++++++ ");
}
