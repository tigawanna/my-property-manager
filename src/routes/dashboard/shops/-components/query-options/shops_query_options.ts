import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";
import { and, like } from "typed-pocketbase";

interface IListShopsQueryOptions {
  keyword: string;
  floor: string;
}

/**
 * Generates query options for listing shops based on the provided keyword and floor.
 *
 * @param {IListShopsQueryOptions} options - An object containing the keyword and floor to filter shops by.
 * @param {string} options.keyword - The keyword to filter shops by.
 * @param {string} options.floor - The floor to filter shops by.
 * @return {Promise<QueryOptions>} - A promise that resolves to the query options for listing shops.
 */
export function listShopsQueryOptions({floor,keyword}:IListShopsQueryOptions){
    return queryOptions({
      queryKey: ["property_shops", keyword, floor],
      queryFn: () => {
        return pb.from("property_shops").getList(1, 24, {
          filter: and(like("shop_number", keyword), like("shop_number", floor)),
          select: {
            expand: {
              tenant: true,
            },
          },
        });
      },
      staleTime: 1000 * 60 * 60,
    });
}

interface IOneShopQueryOptions{
    shop_id:string
}

/**
 * Generates query options for retrieving a single shop based on the provided shop ID.
 *
 * @param {IOneShopQueryOptions} shop_id - An object containing the ID of the shop to retrieve.
 * @return {Promise<QueryOptions>} - A promise that resolves to the query options for retrieving the shop.
 */
export function oneShopQueryOptions({shop_id}:IOneShopQueryOptions){
    return queryOptions({
      queryKey: ["property_shops","one_shop",shop_id],
      queryFn:()=>{
        return pb.from("property_shops").getOne(shop_id, {
          select: {
            expand: {
              tenant: true
            },
          },
        });
      },
      staleTime:1000*60*60
    });
}
