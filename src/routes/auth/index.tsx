import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { SigninComponent } from "./-components/SigninComponent";
import { MapPinHouse } from "lucide-react";
const searchparams = z.object({
  returnTo: z.string(),
});
export const Route = createFileRoute("/auth/")({
  component: SigninPage,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    const viewer = ctx.context?.viewer;
    const returnTo = ctx.search?.returnTo ?? "/";
    if (viewer?.record) {
      throw redirect({ to: returnTo });
    }
  },
});

interface SigninPageProps {}

export function SigninPage({}: SigninPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      {/* <Link
        to="/"
        className="absolute left-[2%] top-[2%] flex items-center gap-2 text-2xl font-bold hover:text-accent"
      >
        My property manager
        <MapPinHouse />
      </Link> */}
      <SigninComponent />
    </div>
  );
}
