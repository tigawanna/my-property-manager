import { useSuspenseQuery } from "@tanstack/react-query";
import { HouseFloorsKeys } from "./use-shook-hooks";
import { ShopCard } from "./ShopCard";
import { listShopsQueryOptions } from "../query-options/shops-query-options";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { CreateShopModal } from "../form/CreateShops";
import { Plus } from "lucide-react";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";


interface ShopsListProps {
  keyword?: string;
  floor: HouseFloorsKeys|"";
}

export function ShopsList({ keyword = "", floor }: ShopsListProps) {
  const query = useSuspenseQuery(listShopsQueryOptions({ floor, keyword }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="shops" />
      </div>
    );
  }

  return (
    <ul className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[90%] flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          const tenant = item.expand?.tenant;
          return <ShopCard key={item.id} item={item} />;
        })}
        <div className="flex h-52 w-[95%] items-center justify-center rounded-xl bg-gradient-to-r from-base-300 to-base-200 sm:w-[45%] lg:w-[30%]">
          <CreateShopModal
            trigger={
              <div className="">
                <Plus className="size-9" />
              </div>
            }
          />
        </div>
      </div>
    </ul>
  );
}
