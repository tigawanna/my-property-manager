import { Suspense } from "react";
import { useBillsPeriod } from "./api/use-bills-period";
import { BillsPeriodPicker } from "./list/BillsPeriodPicker";
import { BillsTableSuspenseFallback, MonthlyBillsTable } from "./list/BillsTable";

interface BillsPageProps {}

export function BillsPage({}: BillsPageProps) {
  const { period, setPeriod } = useBillsPeriod();

  return (
    <div className="flex h-full w-full flex-col">
      <BillsPeriodPicker period={period} setPeriod={setPeriod} />
      <Suspense fallback={<BillsTableSuspenseFallback period={period} />}>
        <div className="w-full p-[2%]">
          <MonthlyBillsTable period={period} />
        </div>
      </Suspense>
    </div>
  );
}
