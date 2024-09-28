import { pb } from "@/lib/pb/client";
import { wordToNumber } from "@/utils/string";
import { useSuspenseQuery } from "@tanstack/react-query";
import { and, like } from "typed-pocketbase";

import { HouseFloorsKeys } from "./use-shook-hooks";
import { ShopCard } from "./ShopCard";
import { listShopsQueryOptions } from "../query-options/shops-query-options";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryEror";

interface ShopsListProps {
  keyword?: string;
  floor: HouseFloorsKeys;
}

export function ShopsList({ keyword = "",floor }: ShopsListProps) {
  const query = useSuspenseQuery(
    listShopsQueryOptions({floor,keyword})
  );
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="w-full h-full min-h-[90vh] flex flex-col justify-center items-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length===0) {
    return (
      <div className="w-full h-full min-h-[90vh] flex flex-col justify-center items-center">
        <PBReturnedUseQueryError error={new Error("No shops found")} />
      </div>
    );
  }

  return (
    <ul className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[90%] flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          const tenant = item.expand?.tenant;
          return <ShopCard key={item.id} item={item}  />;
        })}
      </div>
    </ul>
  );
}
