import { Suspense } from "react";
import { useBillsPeriod } from "../api/use-bills-period";
import { BillsPeriodPicker } from "./BillsPeriodPicker";
import { MonthlyBillsTable, BillsTableSuspenseFallback } from "./BillsTable";

interface BillsContainerProps {}

export function BillsContainer({}: BillsContainerProps) {
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
