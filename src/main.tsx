import ReactDOM from 'react-dom/client'
import { Link, RouterProvider, createRouter } from '@tanstack/react-router'

import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from './routeTree.gen'
import { useViewer } from './lib/tanstack/query/use-viewer';
import { pb } from './lib/pb/client';
import React, { useEffect } from 'react';
import { GlobalRouterLoading } from './components/GlobalRouterLoading';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (_, __, ___, mutation) => {
      if (Array.isArray(mutation.meta?.invalidates)) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        mutation.meta?.invalidates.forEach((key) => {
          return queryClient.invalidateQueries({
            queryKey: [key.trim()],
          });
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => <GlobalRouterLoading/>,
  defaultNotFoundComponent() {
    return (
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
        <div className="bg-bg-emphasized flex flex-col items-center justify-center rounded-lg p-[5%]">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl">Page Not Found</p>
          <Link to="/" className="btn btn-link btn-sm">Back to Home</Link>
        </div>
      </div>
    );
  },
  // defaultPendingComponent: () => (
  //   <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
  //     <div className="rounded-full border-b-2 border-primary">
  //       <Loader className="animate-spin" />
  //     </div>
  //   </div>
  // ),
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div className="rounded-xl border-error border p-5 text-error-content bg-error/20">
        <p className="">{error.name}</p>
        <p className="text-sm">{error.message}</p>
      </div>
    </div>
  ),
  context: {
    pb: undefined!, // We'll inject this when we render
    queryClient,
    viewer: undefined,
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  useEffect(() => {
  document.documentElement.dataset.style="vertical"
},[])
  const { userQuery } = useViewer();

  return (
    <>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        context={{
          pb,
          queryClient,
          viewer: userQuery.data,
        }}
      />
    </>
  );
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </React.StrictMode>
  );
}
