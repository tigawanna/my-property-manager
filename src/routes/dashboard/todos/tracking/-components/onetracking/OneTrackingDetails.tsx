
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { oneTrackingQueryOptions } from "@/routes/dashboard/todos/tracking/-query-options/tracking-query-option";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";

interface OneTrackingDetailsProps {
}

export function OneTrackingDetails({}: OneTrackingDetailsProps) {
  const { tracking } = useParams({ from: "/dashboard/todos/tracking/$tracking/" });
  const query = useSuspenseQuery(oneTrackingQueryOptions({ tracking }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

  