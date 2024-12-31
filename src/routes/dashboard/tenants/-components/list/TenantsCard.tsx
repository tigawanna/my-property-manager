import { cn } from "@/components/shadcn/lib/utils";
import { wordToNumber } from "@/utils/string";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { cva } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import {
  PropertyShopsResponse,
  PropertyTenantsListResponse,
  PropertyUserResponse,
} from "@/lib/pb/pb-types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { oneTenantShopsQueryOptions } from "../tenants-query-options";
import { Suspense } from "react";

interface TenantsCardProps {
  variant?: "default" | "wide";
  cardClassname?: string;
  item: PropertyTenantsListResponse & {
    expand?:
      | {
          account?: PropertyUserResponse | undefined;
          property_shops_via_tenant?: PropertyShopsResponse[] | undefined;
        }
      | undefined;
  };
  oneTenantMode?: boolean;
}

export function TenantsCard({
  variant = "default",
  cardClassname,
  oneTenantMode,
  item,
}: TenantsCardProps) {
  const tenantCardVariants = cva(
    "flex  items-center gap-3  bg-gradient-to-r from-base-300 p-3 ",
    {
      variants: {
        variant: {
          default:
            "h-56 hover:via-secondary/30 hover:scale-95 hover:duration-300 hover:ease-in-out hover:text-primary w-[95%] lg:w-[45%]  rounded-xl to-base-200",
          wide: "w-full ",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );
  const shops = item.expand?.property_shops_via_tenant;
  const max_shops_to_show = 4

  return (
    <Link
      to={`/dashboard/tenants/$tenant`}
      params={{
        tenant: item.id,
      }}
      key={item.id}
      className={cn(tenantCardVariants({ variant }), cardClassname)}
    >
      <div className="flex h-full w-full flex-col justify-between gap-2 p-2">
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex w-full justify-end">
            {/* <img
              alt={item.name}
              className="size-[100px] rounded-lg"
              src={`https://picsum.photos/id/${wordToNumber(item.name)}/100/100`}
            /> */}
            <div className="flex w-full items-center gap-2">
              {shops && shops.length > 0 && (
                <div className="flex items-center justify-start gap-2">
                  {shops?.slice(0, max_shops_to_show).map((shop) => (
                    <div
                      className="flex items-center justify-start gap-2"
                      key={shop.id}
                    >
                      {/* <User className="w-3 h-3" /> */}
                      <h4 className="badge badge-primary badge-outline px-1">
                        {shop.shop_number}
                      </h4>
                    </div>
                  ))}
                  {shops?.length > max_shops_to_show && (
                    <span className="badge badge-primary badge-outline px-1">
                      +{shops?.length - max_shops_to_show} more
                    </span>
                  )}
                </div>
              )}
            </div>
            <Avatar className="size-20">
              <AvatarImage
                alt={item.name}
                className="size-full"
                src={`https://picsum.photos/id/${wordToNumber(item.name)}/100/100`}
              />
              <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div>
          <div className="">{item?.expand?.account?.email}</div>
          <div className="break-words text-4xl">{item?.name}</div>
        </div>
      </div>
    </Link>
  );
}

