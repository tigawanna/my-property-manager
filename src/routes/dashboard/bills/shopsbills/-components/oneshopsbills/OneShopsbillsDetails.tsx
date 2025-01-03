
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { oneShopsbillsQueryOptions } from "@/routes/dashboard/bills/shopsbills/-query-options/shopsbills-query-option";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";

interface OneShopsbillsDetailsProps {
}

export function OneShopsbillsDetails({}: OneShopsbillsDetailsProps) {
  const { shopsbills } = useParams({ from: "/dashboard/bills/shopsbills/$shopsbills/" });
  const query = useSuspenseQuery(oneShopsbillsQueryOptions({ shopsbills }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
           <ErrorWrapper error={error} />
      </div>
    );
  }
  return (
    <div className="w-full h-full min-h-[90vh] flex  flex-col items-center justify-center">
      <div className="text-5xl font-bold border border-primary p-10 rounded-2xl">
      {JSON.stringify(data, null, 2)}
    </div>
    </div>
  );
}

  