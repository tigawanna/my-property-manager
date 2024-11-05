import { Suspense } from "react";
import { useBillsPeriod } from "./api/use-bills-period";
import { BillsPeriodPicker } from "./list/BillsPeriodPicker";
import { MonthlyBillsTable } from "./list/BillsTable";
import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";

interface BillsPageProps {}

export function BillsPage({}: BillsPageProps) {
  const { period, setPeriod } = useBillsPeriod();

  return (
    <div className="flex h-full w-full flex-col">
      <BillsPeriodPicker period={period} setPeriod={setPeriod} />
      <Suspense fallback={<GeneriicTableSkeleton />}>
        <div className="w-full p-[2%]">
          <MonthlyBillsTable period={period} />
        </div>
      </Suspense>
    </div>
  );
}
