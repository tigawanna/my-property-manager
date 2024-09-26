import {createRootRouteWithContext } from '@tanstack/react-router'
import "@/view-transition/angled-transition.css"
import "@/view-transition/wipe-transition.css"
import "@/view-transition/slides-transition.css"
import "@/view-transition/flip-transition.css"
import "@/view-transition/vertical-transition.css"
import "./styles.css"
import { PocketBaseClient } from '@/lib/pb/client';
import { QueryClient } from '@tanstack/react-query';
import { PocketbaseViewerType } from '@/lib/tanstack/query/use-viewer';
import { z } from 'zod';
import { RootComponent } from './-components/RootComponent';

export const Route = createRootRouteWithContext<{
  pb: PocketBaseClient;
  queryClient: QueryClient;
  viewer?: PocketbaseViewerType;
}>()({
  component: RootComponent,
});


