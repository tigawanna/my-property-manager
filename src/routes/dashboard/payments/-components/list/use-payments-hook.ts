import { useDebouncedValue } from "@/utils/hooks/use-debouncer";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useTransition, useState, useEffect } from "react";

interface UsePaymentsSearchQueryProps {
  query_prefix: string;
  search_query?: boolean;
  default_value?: string;
}
export function usePaymentsSearchQuery(
  opts: UsePaymentsSearchQueryProps = {
    query_prefix: "sq",
    search_query: true,
  },
) {
  const { sq } = useSearch({ from: "/dashboard/payments/" });
  const navigate = useNavigate({ from: "/dashboard/payments" });
  const [_, startTransition] = useTransition();

  const [keyword, setKeyword] = useState(sq ?? opts.default_value ?? "");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  useEffect(() => {
    if (sq !== debouncedValue) {
      startTransition(() => {
        navigate({
          search: {
            sq: debouncedValue,
          },
        });
      });
    }
  }, [debouncedValue]);
  return { debouncedValue, isDebouncing, keyword, setKeyword };
}
