import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { dashboard_routes } from "@/components/navigation/routes";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { Link } from "@tanstack/react-router";
import { CreatePaymentForm } from "../payments/-components/form/CreatePaymentForm";


interface DashboardPageProps {}
dashboard_routes

export function DashboardPage({}: DashboardPageProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record;
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <CreatePaymentForm/>
      <ul className="grid h-full w-full grid-cols-1 justify-center gap-2 p-[5%] md:grid-cols-2 lg:grid-cols-2">
        {dashboard_routes.map((link) => {
          if (
            !(viewer?.staff && viewer?.staff.length > 0) &&
            (link.name === "utilities" || link.name === "payments")
          ) {
            return;
          }
          return (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-accent-text flex h-full items-center justify-center gap-2 rounded-xl bg-base-200 p-[5%] text-4xl hover:bg-base-300"
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
