import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";
import { and, eq, like } from "typed-pocketbase";

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
export function listShopsQueryOptions({
  floor,
  keyword,
}: IListShopsQueryOptions) {
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

interface IOneShopQueryOptions {
  shop: string;
}

/**
 * Generates query options for retrieving a single shop based on the provided shop ID.
 *
 * @param {IOneShopQueryOptions} shop - An object containing the ID of the shop to retrieve.
 * @return {Promise<QueryOptions>} - A promise that resolves to the query options for retrieving the shop.
 */
export function oneShopQueryOptions({ shop }: IOneShopQueryOptions) {
  return queryOptions({
    queryKey: ["property_shops", "one_shop", shop],
    queryFn: () => {
      return pb.from("property_shops").getOne(shop, {
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

interface IOneShopBillsQueryOptions {
  shop: string;
  year: number;
}

export function oneShopBillsQueryOptions({
  shop,
  year,
}: IOneShopBillsQueryOptions) {
  return queryOptions({
    queryKey: ["property_shops", "one_shop", shop, "shop_bills", year],
    queryFn: () => {
      return pb.from("property_bills").getList(1, 24, {
        filter: and(eq("shop.id", shop), eq("year", year)),
        sort: ["-year", "-month"],
        select: {
          expand: {
            shop: true,
          },
        },
      });
    },
    select(data) {
      return {
        ...data,
        items: data.items.map((item, idx) => {
          const prev_elec = data?.items?.[idx + 1]?.elec_readings ?? 0;
          const prev_water = data?.items?.[idx + 1]?.water_readings ?? 0;
          const elec_diff = (item.elec_readings - prev_elec).toFixed(2);
          const water_diff = (item.water_readings - prev_water).toFixed(2);
          return { ...item, elec_diff, water_diff };
        }),
      };
    },
    staleTime: 1000 * 60 * 60,
  });
}

interface IOneShopPaymentsQueryOptions {
  shop: string;
  year: number;
}

export function oneShopPaymentsQueryOptions({
  shop,
  year,
}: IOneShopPaymentsQueryOptions) {
  return queryOptions({
    queryKey: ["property_shops", "one_shop", shop, "shop_payments", year],
    queryFn: () => {
      return pb.from("property_shop_payments").getList(1, 24, {
        filter: and(eq("shop.id", shop), eq("year", year)),
        sort: ["-year", "-month"],
        select: {
          expand: {
            shop: true,
          },
        },
      });
    },

    staleTime: 1000 * 60 * 60,
  });
}


