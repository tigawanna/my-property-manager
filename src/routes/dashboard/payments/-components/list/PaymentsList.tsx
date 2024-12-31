import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPropertyQueryOptions } from "../query-options/payments-query-options";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { PaymentsTable } from "./PaymentsTable";
import { PropertyShopsResponse, PropertyStaffListResponse } from "@/lib/pb/pb-types";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { PaymentsCard } from "./PaymentsCard";

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
        <ItemNotFound label="payments" />
      </div>
    );
  }

  return (
    <div className="flex h-full  w-full flex-col items-center ">
      <div className="max-w-[99vw] w-full hidden lg:flex overflow-auto">
        <PaymentsTable data={data} />
      </div>
      <ul className="flex w-full lg:hidden p-2 flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          return (
            <PaymentsCard key={item.id} payment={item}/>
          )
        })}
      </ul>
    </div>
  );
}
