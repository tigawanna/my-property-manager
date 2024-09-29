import { cn } from "@/components/shadcn/lib/utils";
import { wordToNumber } from "@/utils/string";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { cva } from "class-variance-authority";
import { Zap, Droplet } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PropertyShopsResponse, PropertyTenantsListResponse } from "@/lib/pb/database";





type ShopExpand = {
  expand?:
    | {
        "property_shops(tenant)"?: PropertyShopsResponse[] | undefined;
      }
    | undefined;
};
interface TenantsCardProps {
  variant?: "default" | "wide";
  cardClassname?: string;
  item: PropertyTenantsListResponse & ShopExpand;
  oneTenantMode?: boolean;
}

export function TenantsCard({
  variant="default",
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
            "h-56 hover:via-secondary/30 hover:scale-95 hover:duration-300 hover:ease-in-out hover:text-primary w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl to-base-200",
          wide: "w-full ",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );
const shops = item.expand?.["property_shops(tenant)"];
  return (
    <Link
      to={`/dashboard/tenants/$tenant`}
      params={{
        tenant: item.id,
      }}
      key={item.id}
      className={cn(tenantCardVariants({ variant }), cardClassname)}
    >
      <div className="flex h-full w-full flex-col justify-between gap-2">
        <div className="flex w-full items-start justify-between gap-2">
          <div className="">
            <Avatar>
              <AvatarImage
                alt={item.name}
                className="size-full"
                src={`https://picsum.photos/id/${wordToNumber(item.name)}/30/30`}
              />
              <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="text-4xl break-words">{item?.name}</div>

        <div className="flex h-full w-full flex-col justify-end p-2">
{!oneTenantMode&&<div className="flex w-full items-center gap-2">
            {shops && shops.length > 0 && (
              <div className="flex items-center justify-start gap-2">
                {shops?.map((shop) => (
                  <div
                    className="flex items-center justify-start gap-2"
                    key={shop.id}
                  >
                    {/* <User className="w-3 h-3" /> */}
                    <h4 className="badge badge-primary badge-outline px-1 text-xs">
                      {shop.shop_number}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>}
        </div>
      </div>
    </Link>
  );
}
