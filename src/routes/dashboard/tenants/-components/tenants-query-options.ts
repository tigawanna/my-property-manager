import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";
import { and, eq, like, or } from "@tigawanna/typed-pocketbase";

interface IListTenantsQueryOptions {
  keyword: string;
}

/**
 * Generates query options for listing shops based on the provided keyword and floor.
 *
 * @param {IListTenantsQueryOptions} options - An object containing the keyword and floor to filter shops by.
 * @param {string} options.keyword - The keyword to filter shops by.
 * @return {Promise<QueryOptions>} - A promise that resolves to the query options for listing shops.
 */
export function listTenantsQueryOptions({ keyword }: IListTenantsQueryOptions) {
  return queryOptions({
    queryKey: ["property_tenants_list", keyword],
    queryFn: () => {
      return pb.from("property_tenants_list").getList(1, 24, {
        filter: or(like("name", keyword)),
        select: {
          expand: {
            "property_shops_via_tenant": true,
            // "property_shops(tenant)": true,
          },
        },
      });
    },
    staleTime: 1000 * 60 * 60,
  });
}

interface IOneTenantQueryOptions {
  tenant: string;
}

/**
 * Generates query options for retrieving a single tenant based on the provided tenant ID.
 *
 * @param {IOneTenantQueryOptions} tenant - An object containing the ID of the tenant to retrieve.
 * @return {Promise<QueryOptions>} - A promise that resolves to the query options for retrieving the tenant.
 */
export function oneTenantQueryOptions({ tenant }: IOneTenantQueryOptions) {
  return queryOptions({
    queryKey: ["property_tenants_list", "one_tenant", tenant],
    queryFn: () => {
      return pb.from("property_tenants_list").getOne(tenant, {
        select: {
          expand: {
            "account": true,
          },
        },
      });
    },
    staleTime: 1000 * 60 * 60,
  });
}


export function oneTenantShopsQueryOptions({ tenant }: IOneTenantQueryOptions){
  return queryOptions({
    queryKey: ["property_shops", "one_tenant", tenant],
    queryFn: () => {
      // pb.autoCancellation(false)
      return pb.from("property_shops").
      getFullList({
        filter:like("tenant",tenant)
      })
    },
    staleTime: 1000 * 60 * 60,
  });
}

interface IOneTenantBillsQueryOptions {
  shop: string;
  year: number;
  tenant: string;
}

export function oneTenantBillsQueryOptions({
  shop,
  year,
  tenant,
}: IOneTenantBillsQueryOptions) {
  return queryOptions({
    queryKey: ["property_shops", "one_shop", shop, "shop_bills", year],
    queryFn: () => {
      return pb.from("property_bills").getList(1, 24, {
        filter: and(
          eq("year", year),
          // eq("shop.property_bills(shop).shop.tenant.name", tenant),
        ),
        sort: ["-year", "-month"],
        select: {
          expand: {
            shop: {
              expand: {
                tenant: true,
              },
            },
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
    // staleTime:1000*60*60
  });
}
