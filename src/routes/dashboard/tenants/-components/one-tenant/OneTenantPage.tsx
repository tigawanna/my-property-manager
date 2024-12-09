import { useSuspenseQuery } from "@tanstack/react-query";
import { TenantsCard } from "../list/TenantsCard";
import { oneTenantQueryOptions } from "../tenants-query-options";
import { useParams } from "@tanstack/react-router";
import { ShopCard } from "@/routes/dashboard/shops/-components/list/ShopCard";
import { UpdateTenantModal } from "../form/UpdateTenant";
import { Suspense } from "react";
import { OneTenantShops } from "./OneTenantShops";

interface OneTenantPageProps {}

export function OneTenantPage({}: OneTenantPageProps) {
  const { tenant } = useParams({ from: "/dashboard/tenants/$tenant/" });
  const query = useSuspenseQuery(oneTenantQueryOptions({ tenant }));
  const data = query.data;
  // const shops = data?.expand?.["property_shops(tenant)"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full items-center gap-2 p-2">
        <TenantsCard
          oneTenantMode
          item={data}
          variant="wide"
          cardClassname="w-full min-h-[40%]"
        />
        <UpdateTenantModal item={data} />
      </div>
      <Suspense>
        <OneTenantShops tenant={tenant}/>
      </Suspense>

    </div>
  );
}
