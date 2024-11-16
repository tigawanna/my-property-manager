import { createFileRoute } from '@tanstack/react-router'
import { LoadFromDocxPage } from './-components/LoadFromDocx';

export const Route = createFileRoute("/dashboard/todos/tracking/load/")({
  component: LoadFromDocxPage,
});
