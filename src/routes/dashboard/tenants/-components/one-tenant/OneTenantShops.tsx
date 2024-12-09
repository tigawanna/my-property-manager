import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { oneTenantShopsQueryOptions } from "../tenants-query-options";
import { ShopCard } from "@/routes/dashboard/shops/-components/list/ShopCard";

interface OneTenantShopsProps {
    tenant:string
}

export function OneTenantShops({tenant}: OneTenantShopsProps) {
  const query = useSuspenseQuery(oneTenantShopsQueryOptions({ tenant }));
  const data = query.data
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ul className="flex w-full items-center gap-2">
        {data && data.length > 0 && (
          <li className="flex w-[90%] flex-wrap justify-center gap-2">
            {data?.map((shop) => <ShopCard key={shop.id} item={shop} />)}
          </li>
        )}
      </ul>
    </div>
  );
}
