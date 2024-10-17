import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryEror";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPropertyQueryOptions } from "../query-options/payments-query-options";
import { GenericTable } from "@/components/wrappers/GenericTable";
import { pb } from "@/lib/pb/client";
import { GenericPocketbaseGenericTable } from "@/components/wrappers/PocketbaseGenericTable";

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
        <PBReturnedUseQueryError error={new Error("No shops found")} />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <GenericPocketbaseGenericTable
        rows={data.items}
        updateItem={(item) =>
          pb.from("property_shop_payments").update(item.id, item)
        }
        columns={[
          { label: "month", type: "number", accessor: "month" },
          { label: "year", type: "number", accessor: "year" },
          { label: "amount", type: "number", accessor: "amount" },
          { label: "shop", type: "number", accessor: "shop" },
        ]}
      />
    </div>
  );
}
