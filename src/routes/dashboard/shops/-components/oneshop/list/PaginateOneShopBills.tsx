import { PlusMinusYear } from "@/routes/dashboard/bills/-components/list/BillsPeriodPicker";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { startTransition } from "react";

interface PaginateOneShopBillsProps {
  shop: string;
}

export function PaginateOneShopBills({ shop }: PaginateOneShopBillsProps) {
  const { cy } = useSearch({ from: "/dashboard/shops/$shop/" });
  const navigate = useNavigate({ from: "/dashboard/shops/$shop" });
  const currentYear = new Date().getFullYear();
  const selectedYear = cy ?? currentYear;
  return (
    <div className="flex w-full items-center justify-center">
      <PlusMinusYear
        value={selectedYear}
        setValue={(value) =>
          startTransition(() => {
            navigate({
              search: { cy: value },
              params: { shop },
              replace: true,
            });
          })
        }
        maxYear={currentYear}
        minYear={2022}
      />
    </div>
  );
}
