import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryEror";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPropertyQueryOptions } from "../query-options/payments-query-options";
import { pb } from "@/lib/pb/client";
import { GenericPocketbaseGenericTable } from "@/lib/pb/components/PocketbaseGenericTable";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { makeHotToast } from "@/components/toasters";

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
  const {userQuery} = useViewer()
  const viewer  = userQuery.data.record
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
      makeToast={makeHotToast}
      createItem={(item) => pb.from("property_shop_payments").create(item)}
      defaultRowValue={{
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        amount: 5000,
        staff:viewer?.id,
        type: "rent",
      }}
      mappedColumns={() => [
        { label: "month", type: "number", accessor: "month" },
        { label: "year", type: "number", accessor: "year" },
        { label: "amount", type: "number", accessor: "amount" },
        { label: "recipt", type: "text", accessor: "reciept_number" },
        { label: "type", type: "text", accessor: "type" },
        {
          label: "shop",
          type: "number",
          accessor: "shop.shop_number",
          expand: {
            collection: "property_shops",
          },
        },
        {
          label: "by",
          type: "number",
          accessor: "staff.name",
          expand: {
            collection: "property_staff_list",
          },
        },
      ]}
    />
  </div>
);
}
