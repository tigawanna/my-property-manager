import { useBillsQuery } from "../api/use-bills";
import { Edit } from "lucide-react";
import { BillsPeriod } from "../api/bills";
import { twMerge } from "tailwind-merge";
import { MutateBill } from "../form/MutateBill";

interface MonthlyBillsTableProps {
  period: BillsPeriod;
  printing?: boolean;
  tableClassname?:string;
}

export function MonthlyBillsTable({ period,printing,tableClassname }: MonthlyBillsTableProps) {
  const query = useBillsQuery(period);
  const data = query.data.result;

  return (
    <div className={twMerge("w-full h-screen overflow-auto",tableClassname)}>
        <p> 
           Bills {period.curr_year}/{period.curr_month}
        </p>
      <table className="" >
        <thead className="sticky top-0 bg-bg-muted">
          <tr>
            {/* shop details */}
            {!printing&&<th>Order</th>}
            <th>Shop No</th>
            <th>Shop Name</th>
            {/* previous */}
            <th>Prev Water</th>
            <th>Curr Water</th>
            <th>Diff</th>
            {/* current */}
            <th>Prev Elec</th>
            <th>Curr Elec</th>
            <th>Diff</th>
            {/* update */}
            {!printing&&<th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item.shop_id}>
                {/* shop details */}
                {!printing&&<td>{item.list_order}</td>}
                <td>{item.shop_number}</td>
                <td>{item.shop_name}</td>

                {/* water */}
                <td>{item.previous_water}</td>
                <td>{item.current_water}</td>
                <td>{parseInt(item.water_diff).toFixed(2)}</td>
                {/* elec */}
                <td>{item.previous_elec}</td>
                <td>{item.current_elec}</td>
                <td>{parseInt(item.elec_diff).toFixed(2)}</td>
                {/* update */}
                {!printing&&<td className="flex justify-center items-center">
             
                  <MutateBill bill={item} />
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface BillsTableSuspenseFallbac {
  period: BillsPeriod;
}
export function BillsTableSuspenseFallback({ period }: BillsTableSuspenseFallbac) {
    const data = Array.from({ length: 12 });
  return (
    <div className="w-full h-screen overflow-auto">

      <table className="w-full overflow-auto">
        <caption>
          Bills {period.curr_year}/{period.curr_month}
        </caption>
        <thead>
          <tr>
            {/* shop details */}
            <th>Order</th>
            <th>Shop No</th>
            <th>Shop Name</th>
            {/* previous */}
            <th>Prev Water</th>
            <th>Curr Water</th>
            <th>Diff</th>
            {/* current */}
            <th>Prev Elec</th>
            <th>Curr Elec</th>
            <th>Diff</th>
            {/* update */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((_, idx) => {
            return (
              <tr key={idx}>
                {/* shop details */}
                <td className="bg-base-300 animate-pulse p-1" />
                <td className="bg-base-300 animate-pulse p-1" />
                <td className="bg-base-300 animate-pulse p-1" />

                {/* prev */}
                <td className="bg-base-300 animate-pulse p-1" />
                <td className="bg-base-300 animate-pulse p-1" />
                <td className="bg-base-300 animate-pulse p-1" />
                {/* current */}
                <td className="bg-base-300 animate-pulse p-1" />
                <td className="bg-base-300 animate-pulse p-1" />
                <td className="bg-base-300 animate-pulse p-1" />
                {/* update */}
                <td>
                  <Edit className="size-4" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
