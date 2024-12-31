import { pb } from "@/lib/pb/client";
import { PropertyShopPaymentsResponse } from "@/lib/pb/pb-types";
import { queryOptions } from "@tanstack/react-query";
import { and, eq, like } from "@tigawanna/typed-pocketbase";

interface IListPropertyQueryOptions {
  keyword: string;
  month: number;
  year: number;
  page: number;
  type: PropertyShopPaymentsResponse["type"] | "";
  range: "yearly" | "monthly";
}

export function listPropertyQueryOptions({
  keyword,
  month,
  year,
  page = 1,
  type,
  range,
}: IListPropertyQueryOptions) {
  return queryOptions({
    queryKey: ["property_shops_payments", keyword, month, year, page,type,range],
    queryFn: () => {
      return pb.from("property_shop_payments").getList(page, 100, {
        filter: and(
          type==="" ? null : eq("type", type),
          like("shop.tenant.name", keyword),
          range==="yearly" ? null : eq("month", month),
          like("year", year),
        ),
        sort: ["-year", "-month"],
        select: {
          expand: {
            shop: {
              expand: {
                tenant: true,
              },
            },
            staff: true,
          },
        },
      });
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function onePaymentQueryOptions({ id }: { id: string }) {
  return queryOptions({
    queryKey: ["property_shops_payments", id],
    queryFn: () => {
      return pb.from("property_shop_payments").getOne(id, {
        select: {
          expand: {
            shop: true,
            staff: true,
          },
        },
      });
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function oneShopPaymentsQueryOptions({
  shop,
  month,
  year,
  page = 1,
}: {
  shop: string;
  month: number;
  year: number;
  page: number;
}) {
  return queryOptions({
    queryKey: ["property_shops_payments", shop, month, year, page],
    queryFn: () => {
      return pb.from("property_shop_payments").getList(page, 24, {
        filter: and(eq("shop.id", shop), eq("month", month), eq("year", year)),
        select: {
          expand: {
            shop: true,
            staff: true,
          },
        },
      });
    },
    staleTime: 1000 * 60 * 60,
  });
}
