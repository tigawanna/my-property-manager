import { useEffect, useState, useTransition } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebouncedValue } from "@/utils/hooks/use-debouncer";

export const houseFloorsKeys = [
  "All",
  "Basement",
  "G-",
  "M1-",
  "M2-",
  "M3-",
  "M4-",
  "M5-",
  "M6-",
  "M7-",
  "M8-",
  "M9-",
  "M10-",
] as const;
export type HouseFloorsKeys = (typeof houseFloorsKeys)[number];
export type HouseFloors = {
  [key in (typeof houseFloorsKeys)[number]]: string;
};

export const houseFloors: HouseFloors = {
  All: "",
  Basement: "basement",
  "G-": "ground",
  "M1-": "first",
  "M2-": "second",
  "M3-": "third",
  "M4-": "fourth",
  "M5-": "fifth",
  "M6-": "sixth",
  "M7-": "seventh",
  "M8-": "eighth",
  "M9-": "ninth",
  "M10-": "tenth",
};

interface UseShopssSearchQueryProps {
  query_prefix: string;
  search_query?: boolean;
  default_value?: string;
}
export function useShopssSearchQuery(
  opts: UseShopssSearchQueryProps = {
    query_prefix: "sq",
    search_query: true,
  },
) {
  const { sq } = useSearch({ from: "/dashboard/shops/" });
  const navigate = useNavigate({ from: "/dashboard/shops" });
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

export function useShopsFlooor() {
  const { floor } = useSearch({ from: "/dashboard/shops/" });
  const navigate = useNavigate({ from: "/dashboard/shops" });
  const [_, startTransition] = useTransition();

  function setHouseFloor(newFloor: HouseFloorsKeys) {
    startTransition(() => {
      navigate({
        search: {
          floor: newFloor,
        },
      });
    });
  }

  return {
    floor,
    setHouseFloor,
  };
}
