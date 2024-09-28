import { useSuspenseQuery } from "@tanstack/react-query";
import { oneShopQueryOptions } from "../query-options/shops_query_options";
import { ShopCard } from "../list/ShopCard";


interface OneShopDetailsProps {
    shop_id:string
}

export function OneShopDetails({shop_id}:OneShopDetailsProps){
 const query = useSuspenseQuery(oneShopQueryOptions({shop_id})); 
 const data = query.data  
 const tenant = data?.expand?.tenant
return (
  <div className="flex h-full w-full bg-base-300 flex-col items-center justify-center">
 
      <div className="flex h-full w-full items-center gap-2 p-2">
<ShopCard item={data} variant="wide"/>
      </div>

  </div>
);
}
