import { ValidRoutes } from "@/lib/tanstack/router/router-types";
import { useDebouncedValue } from "@/utils/hooks/use-debouncer";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTransition, useState, useEffect } from "react";

export function usePageSearchQuery(path: ValidRoutes) {
  // @ts-expect-error
  const { sq } = useSearch({ from:`${path}/` });
  const navigate = useNavigate({ from:path });
  const [_, startTransition] = useTransition();

  const [keyword, setKeyword] = useState(sq ?? "");
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
