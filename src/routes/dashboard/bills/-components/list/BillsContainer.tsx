import { Suspense } from "react";
import { useBillsPeriod } from "../api/use-bills-period";
import { BillsPeriodPicker } from "./BillsPeriodPicker";
import { MonthlyBillsTable, BillsTableSuspenseFallback } from "./BillsTable";

interface BillsContainerProps {}

export function BillsContainer({}: BillsContainerProps) {
  const { period, setPeriod } = useBillsPeriod();

  return (
    <div className="w-full h-full flex flex-col  ">
      <BillsPeriodPicker period={period} setPeriod={setPeriod} />
        <Suspense fallback={<BillsTableSuspenseFallback period={period} />}>
        <div className="p-[2%] w-full">
          <MonthlyBillsTable period={period} />
        </div>
      </Suspense>
    </div>
  );
}
