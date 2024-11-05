import { useSearch, useNavigate } from "@tanstack/react-router";

export function usePaymentsPeriod() {
  const { month, year } = useSearch({
    from: "/dashboard/payments/",
  });
  const navigate = useNavigate({});
  return {
    month: month ?? new Date().getMonth() + 1,
    year: year ?? new Date().getFullYear(),
    setMonth: (newMonth: number) => {
      navigate({
        from: "/dashboard/payments",
        search: {

          month: newMonth,
            year,
        },
      });
    },
    setYear: (newYear: number) => {
      navigate({
        from: "/dashboard/payments",
        search: {
          month,
          year: newYear,
        },
      });
    },
  };
}
