import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import ResponsivePagination from "react-responsive-pagination";
import { usePaymentsPeriod } from "../../-hooks/use-shop-params";

interface PaymentsPaginationProps {
  month:number;
  year:number
}

export function PaymentsPagination({month,year}: PaymentsPaginationProps) {
  const navigate = useNavigate({});
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ResponsivePagination
        current={month ?? 1}
        total={12}
        onPageChange={(e) => {
          navigate({
            from: "/dashboard/payments",
            search: {
              month: e,
            },
          });
        }}
      />
    </div>
  );
}
export function PaymentsYearPagination({year}: PaymentsPaginationProps) {
 const {setYear} = usePaymentsPeriod();
 const currentYear = new Date().getFullYear();
  return (
    <div className="flex items-center justify-center border-y p-2">
      <button
        disabled={year === currentYear}
        className="btn btn-ghost btn-sm"
        onClick={() => setYear(year + 1)}
      >
        {" "}
        <Plus />
      </button>
      <span>{year}</span>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setYear(year - 1)}
      >
        <Minus />
      </button>
    </div>
  );
}
