import { Suspense } from "react";
import { BillsTableSuspenseFallback, MonthlyBillsTable } from "../list/BillsTable";
import { BillsPeriod } from "../api/bills";

interface BillsPriodFromParamsProps {
  period: BillsPeriod;
}

export function BillsPriodFromParams({period}: BillsPriodFromParamsProps) {
return (
    <Suspense fallback={<BillsTableSuspenseFallback period={period} />}>
      <MonthlyBillsTable period={period} tableClassname="h-full p-[2%]" printing/>
    </Suspense>
  );
}
