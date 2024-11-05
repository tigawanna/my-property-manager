import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import ResponsivePagination from "react-responsive-pagination";

interface PaymentsPaginationProps {}

export function PaymentsPagination({}: PaymentsPaginationProps) {
  const { month, year } = useSearch({
    from: "/dashboard/payments/",
  });
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
