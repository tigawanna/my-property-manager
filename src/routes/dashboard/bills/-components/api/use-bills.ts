import { pb } from "@/lib/pb/client";
import { BillsPeriod, getMonthlyBills, getOneMonthlyBill } from "./bills";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useBillsQuery(period: BillsPeriod) {
  const query = useSuspenseQuery({
    queryKey: ["monthly-bills", period],
    queryFn: () => getMonthlyBills(pb, period),
    select: (data) => {
      return {
        ...data,
        result: data.result.filter((item) =>
          !item.shop_name.startsWith("dummy_"),
        ),
      };
    },
  });
  // console.log("bills query", query);
  return query;
}
export function useOneBillQuery(params: {
  curr_bill: string;
  prev_bill: string;
}) {
  const query = useSuspenseQuery({
    queryKey: ["monthly-bills", params],
    queryFn: () => getOneMonthlyBill(pb, params),
  });
  // console.log("bills query", query);
  return query;
}
