import { useSuspenseQuery } from "@tanstack/react-query";
import { TenantsCard } from "../list/TenantsCard";
import { oneTenantQueryOptions } from "../tenants-query-options";
import { useParams } from "@tanstack/react-router";
import { ShopCard } from "@/routes/dashboard/shops/-components/list/ShopCard";

interface OneTenantPageProps {}

export function OneTenantPage({}: OneTenantPageProps) {
  const { tenant } = useParams({ from: "/dashboard/tenants/$tenant/" });
  const query = useSuspenseQuery(oneTenantQueryOptions({ tenant }));
  const data = query.data;
  const shops = data?.expand?.["property_shops(tenant)"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full items-center gap-2 p-2">
        <TenantsCard
          oneTenantMode
          item={data}
          variant="wide"
          cardClassname="w-full min-h-[40%]"
        />
      </div>

      <div className="flex w-full items-center gap-2">
        {shops && shops.length > 0 && (
          <div className="flex w-[90%] flex-wrap justify-center gap-2">
            {shops?.map((shop) => <ShopCard key={shop.id} item={shop} />)}
          </div>
        )}
      </div>
    </div>
  );
}
