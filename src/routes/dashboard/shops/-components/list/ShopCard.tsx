import {
  PropertyShopsResponse,
  PropertyTenantsListResponse,
} from "@/lib/pb/pb-types";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { wordToNumber } from "@/utils/string";
import { Link } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { cn } from "@/components/shadcn/lib/utils";
import { Droplet, Zap } from "lucide-react";
import { TailwindContainerIndicator } from "@/components/navigation/tailwind-indicator";

type ShopsExpand = {
  expand?:
    | {
        tenant?: PropertyTenantsListResponse | undefined;
      }
    | undefined;
};
interface ShopCardProps {
  item: PropertyShopsResponse & ShopsExpand;
  cardClassname?: string;
  variant?: "wide" | "disabled" | "default";
}

export function ShopCard({ item, cardClassname, variant }: ShopCardProps) {
  const tenant = item.expand?.tenant;

  const shopCardVariants = cva(
    "flex  items-center gap-3  bg-gradient-to-r from-base-300 p-3 ",
    {
      variants: {
        variant: {
          default:
            "h-56 hover:via-secondary/30 hover:scale-95 hover:duration-300 hover:ease-in-out hover:text-primary w-[95%] @xl:w-[48%] @3xl:w-[35%] rounded-xl to-base-200",
          wide: "w-full ",
          disabled:
            " hover:via-secondary/30 hover:text-primary w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl to-primary",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );
  if (item.is_vacant) {
    variant = "disabled";
  }
  return (
    <Link
      to={`/dashboard/shops/$shop`}
      params={{
        shop: item.id,
      }}
      key={item.id}
      className={cn(shopCardVariants({ variant }), cardClassname)}
    >
      <div className="flex h-full w-full flex-col justify-between gap-2">
      <TailwindContainerIndicator/>
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {item.is_vacant && (
              <div className="badge badge-primary badge-outline">Vacant</div>
            )}
            {item.dummy_record && (
              <div className="badge badge-primary badge-outline">Dummy shop</div>
            )}
            {item.utils === "elec" && (
              <Zap className="fill-warning stroke-warning" />
            )}
            {item.utils === "water" && (
              <Droplet className="fill-info stroke-info" />
            )}
            {item.utils === "both" && (
              <div className="flex items-center gap-1">
                <Zap className="fill-warning stroke-warning" />
                <Droplet className="fill-info stroke-info" />
              </div>
            )}
          </div>
          {tenant && (
            <div className="">
              <Avatar>
                <AvatarImage
                  alt={tenant.name}
                  className="size-full"
                  src={`https://picsum.photos/id/${wordToNumber(tenant.name)}/30/30`}
                />
                <AvatarFallback>{tenant.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        <div className="flex h-full w-full flex-col justify-end p-2">
          <h1 className="w-full text-5xl font-bold">{item.shop_number}</h1>
          <div className="flex w-full items-center gap-2">
            <div className="">{tenant?.name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
