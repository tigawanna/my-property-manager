import { useSuspenseQuery } from "@tanstack/react-query";
import { oneShopQueryOptions } from "../query-options/shops_query_options";
import { ShopCard } from "../list/ShopCard";

interface OneShopDetailsProps {
  shop: string;
}

export function OneShopDetails({ shop }: OneShopDetailsProps) {
  const query = useSuspenseQuery(oneShopQueryOptions({ shop }));
  const data = query.data;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-base-300">
      <div className="flex h-full w-full items-center gap-2 p-2">
        <ShopCard item={data} variant="wide" />
      </div>
    </div>
  );
}
