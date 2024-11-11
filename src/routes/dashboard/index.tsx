import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "./-components/DashboardPage";
import { authGuard } from "@/lib/tanstack/query/use-viewer";
import { RouterErrorComponent } from "@/lib/tanstack/router/routerErrorComponent";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";

export const Route = createFileRoute("/dashboard/")({
  errorComponent: ({ error }) => <RouterErrorComponent error={error} />,
  async beforeLoad(ctx) {
    // @ts-expect-error
    await authGuard({ ctx });
  },
  pendingComponent: () => {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <CardsListSuspenseFallback
          cards={4}
          containerClassName="w-[90%] md:w-[80%] lg:grid-cols-2"
          cardClassName=""
        />
      </div>
    );
  },
  component: DashboardPage,
});
