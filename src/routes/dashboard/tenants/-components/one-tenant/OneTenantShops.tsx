import { useSuspenseQuery } from "@tanstack/react-query";
import { oneTenantShopsQueryOptions } from "../tenants-query-options";
import { ShopCard } from "@/routes/dashboard/shops/-components/list/ShopCard";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";

interface OneTenantShopsProps {
    tenant:string
}

export function OneTenantShops({tenant}: OneTenantShopsProps) {
  const query = useSuspenseQuery(oneTenantShopsQueryOptions({ tenant }));
  const data = query.data
  if (!data || (data && data.length === 0)) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="Tenant shops" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 @container">
      <div className="text-3xl font-vold w-full p-1">Tenant shops</div>
      {data && data.length > 0 && (
      <ul className="flex w-full items-center gap-2 @container">
          <li className="flex w-[90%] flex-wrap justify-center gap-2">
            {data?.map((shop) => <ShopCard key={shop.id} item={shop} />)}
          </li>
        </ul>
        )}
    </div>
  );
}
