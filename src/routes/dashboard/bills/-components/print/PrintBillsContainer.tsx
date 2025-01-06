import { useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "lucide-react";
import { getMonthName } from "@/utils/date-helpers";
import { caclulatePeriod, currentMonthAndYear } from "../api/use-bills-period";
import { PrintThis } from "./PrintThis";
import { useSearch } from "@tanstack/react-router";

interface PrintBillsContainerProps {}

export default function PrintBillsContainerBills({}: PrintBillsContainerProps) {
  const componentRef = useRef(null);
  const { month, year } = currentMonthAndYear();
  const { curr_year, curr_month, prev_year, prev_month } = caclulatePeriod(
    month,
    year,
  );
  const { cy, cm, py, pm } = useSearch({
    from: "/dashboard/bills/print",
  });
  const period = {
    curr_year: cy ?? curr_year,
    curr_month: cm ?? curr_month,
    prev_year: py ?? prev_year,
    prev_month: pm ?? prev_month,
  };
  useEffect(() => {
    document.title = `Readings_for_${getMonthName(period.curr_month)}_${period.curr_year}`;
  }, []);

  return (
    <div className="w-full p-5">
      <ReactToPrint
        trigger={() => (
          <button className="fixed left-[50%] top-[12%] z-50 p-2">
            <PrinterIcon />
          </button>
        )}
        documentTitle={`readings_for6_${getMonthName(period.curr_month)} ${period.curr_year}`}
        content={() => componentRef.current}
      />

      <PrintThis
        title={`readings for ${getMonthName(period.curr_month)} ${period.curr_year}`}
        ref={componentRef}
        period={period}
      />
    </div>
  );
}
