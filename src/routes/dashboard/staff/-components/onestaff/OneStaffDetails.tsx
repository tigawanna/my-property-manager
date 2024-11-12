import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { oneStaffQueryOptions } from "../../-query-options/staff-query-option";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";

interface OneStaffDetailsProps {
}

export function OneStaffDetails({}: OneStaffDetailsProps) {
  const { staff } = useParams({ from: "/dashboard/staff/$staff/" });
  const query = useSuspenseQuery(oneStaffQueryOptions({ staff }));
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
