import { PageWithPage } from '@/components/shadcn-side-bar/page-with-sidebar';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/dashboard/nice")({
  component: PageWithPage,
});
