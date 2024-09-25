import {createRootRouteWithContext } from '@tanstack/react-router'

import "./styles.css"
import { PocketBaseClient } from '@/lib/pb/client';
import { QueryClient } from '@tanstack/react-query';
import { PocketbaseViewerType } from '@/lib/tanstack/query/use-viewer';
import { z } from 'zod';
import { RootComponent } from './-components/RootComponent';
const searchparams = z.object({
  theme: z.enum(["light", "dark"]).default("light").optional(),
});

export const Route = createRootRouteWithContext<{
  pb: PocketBaseClient;
  queryClient: QueryClient;
  viewer?: PocketbaseViewerType;
}>()({
  validateSearch: (search) => searchparams.parse(search),
  component: RootComponent,
});


