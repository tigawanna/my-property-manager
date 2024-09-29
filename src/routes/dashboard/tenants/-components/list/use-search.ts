import { useEffect, useState, useTransition } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebouncedValue } from "@/utils/hooks/use-debouncer";

interface UseTenantsSearchQuery {
  query_prefix: string;
  search_query?: boolean;
  default_value?: string;
}
export function useTenantsSearchQuery(
  opts: UseTenantsSearchQuery = {
    query_prefix: "sq",
    search_query: true,
  },
) {
  const { sq } = useSearch({ from: "/dashboard/tenants/" });
  const navigate = useNavigate({ from: "/dashboard/tenants" });
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
