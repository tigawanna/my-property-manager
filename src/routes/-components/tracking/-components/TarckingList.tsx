import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPropertyQueryOptions } from "../query-options/payments-query-options";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { PropertyShopsResponse, PropertyStaffListResponse } from "@/lib/pb/database";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};


interface PaymentsListProps {
  keyword: string;
  month: number;
  year: number;
  page: number;
}

export function PaymentsList({
  keyword,
  month,
  year,
  page,
}: PaymentsListProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery.data.record;

  const query = useSuspenseQuery(
    listPropertyQueryOptions({ keyword, month, year, page }),
  );
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="payments"/>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-[99vw] overflow-auto">
        <PaymentsTable data={data} />
      </div>
    </div>
  );
}
