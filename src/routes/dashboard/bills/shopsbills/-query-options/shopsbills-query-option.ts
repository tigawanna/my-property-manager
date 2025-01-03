 
import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";
import { and, eq } from "@tigawanna/typed-pocketbase";


interface shopsbillsQueryOptionPropss {
  keyword: string;
    page?: number;
}
export function shopsbillsListQueryOptions({ keyword, page=1 }: shopsbillsQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_bills", "property_shops", keyword, page],
    queryFn: () => {
      return pb.from("property_shops").getList(page, 24, {
        // filter:and(eq("")),
        // select:{
        //   "expand": {
        //     "property_bills_via_shop": true
        //   }
        // }
      });
    },
  });
}
interface oneShopsbillsQueryOptionPropss {
  shopsbills: string;
}
export function oneShopsbillsQueryOptions({ shopsbills }: oneShopsbillsQueryOptionPropss) {
  return queryOptions({
    queryKey: ["one_shopsbills", shopsbills],
    queryFn: () => {
      return new Promise<{ id: string }>((res) => {
        setTimeout(() => {
          res({
            id: shopsbills,
          });
        }, 1000);
      });
    },
  });
}
  