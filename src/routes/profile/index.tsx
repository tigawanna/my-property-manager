import { authGuard } from "@/lib/tanstack/query/use-viewer";
import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "./-components/ProfilePage";
import { z } from "zod";
const searchparams = z.object({
  returnTo: z.string(),
});

export const Route = createFileRoute("/profile/")({
  validateSearch: (search) => searchparams.parse(search),
  component: ProfilePage,
  async beforeLoad(ctx) {
    await authGuard({ ctx });
  },
});
