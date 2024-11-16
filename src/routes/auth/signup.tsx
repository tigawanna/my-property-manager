import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SignupComponent } from "./-components/SignupComponent";
import { z } from "zod";
import { MapPinHouse } from "lucide-react";

const searchparams = z.object({
  returnTo: z.string(),
});
export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    const viewer = ctx.context?.viewer;
    const returnTo = ctx.search?.returnTo ?? "/";
    if (viewer?.record) {
      throw redirect({ to: returnTo });
    }
  },
});

interface SignupProps {}

export function SignupPage({}: SignupProps) {
  return (
    <div className="to-primary/50items-center flex h-full min-h-screen w-full flex-col justify-center bg-gradient-to-br from-primary/20 via-accent/10">
      <Link to="/" className="absolute hover:text-accent left-[2%] top-[2%] flex items-center gap-2 text-2xl font-bold">
        My property manager
        <MapPinHouse />
      </Link>
      <SignupComponent />
    </div>
  );
}
