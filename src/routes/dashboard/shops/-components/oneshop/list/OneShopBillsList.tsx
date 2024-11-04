import { useSuspenseQuery } from "@tanstack/react-query";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { oneShopBillsQueryOptions } from "../../query-options/shops-query-options";
import { useParams, useSearch } from "@tanstack/react-router";
import { GenericTable } from "@/components/wrappers/GenericTable";
import { pb } from "@/lib/pb/client";

interface ShopsListProps {}

export function ShopsBillsList({}: ShopsListProps) {
  const { shop } = useParams({
    from: "/dashboard/shops/$shop/",
  });
  const { cy } = useSearch({ from: "/dashboard/shops/$shop/" });
  const selectedYear = cy ?? new Date().getFullYear();
  const query = useSuspenseQuery(
    oneShopBillsQueryOptions({ shop, year: selectedYear }),
  );
  const data = query.data;
  const error = query.error;
  console.log("==== data === ", data);
  if (error) {
    return (
      <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
        <div className="flex h-full items-center justify-center rounded-lg border bg-info-content p-[2%] text-sm">
          {error && (
            <div className="warning rounded-lg p-2">No bills found</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-full p-2">
        <GenericTable
          rows={data.items}
          updateItem={(item) => pb.from("property_bills").update(item.id, item)}
          columns={[
            { label: "month", type: "number", accessor: "month" },
            { label: "year", type: "number", accessor: "year" },
            { label: "elec", type: "number", accessor: "elec_readings" },
            { label: "dif", type: "number", accessor: "elec_diff" },
            { label: "water", type: "number", accessor: "water_readings" },
            { label: "dif", type: "number", accessor: "water_diff" },
          ]}
        />
      </div>
    </div>
  );
}
