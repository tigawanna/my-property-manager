import { useSuspenseQuery } from "@tanstack/react-query";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { oneShopBillsQueryOptions } from "../../query-options/shops-query-options";
import { useParams, useSearch } from "@tanstack/react-router";
import { GenericTable } from "@/components/wrappers/GenericTable";
import { pb } from "@/lib/pb/client";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { BillsCard } from "@/routes/dashboard/bills/-components/list/BillsCard";

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
        <ItemNotFound label="shop bills" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-full p-2 hidden lg:flex">
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

      <ul className="flex w-full flex-wrap justify-center gap-2 p-2 lg:hidden">
        {data.items.map((item) => {
          return <BillsCard key={item.id} bills={{
            curr_bill_id: item.id,
            curr_month: String(item.month),
            curr_year: String(item.year),
            current_elec: String(item.elec_readings),
            current_water: String(item.water_readings),
            elec_diff: String(item.elec_diff),
            water_diff: String(item.water_diff),
            prev_bill_id: "",
            prev_month:String(item.month-1),
            prev_year: String(item.year-1),
            previous_elec:String(item.prev_elec),
            previous_water:String(item.prev_water),
            list_order: String(item.expand?.shop?.order)??"",
            shop_name: item.expand?.shop?.tenant??"",
            shop_id: item.expand?.shop?.id??"",
            shop_number: item.expand?.shop?.shop_number??"",
          }} />;
        })}
      </ul>
    </div>
  );
}
