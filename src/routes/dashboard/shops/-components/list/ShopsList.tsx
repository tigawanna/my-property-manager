import { pb } from "@/lib/pb/client";
import { wordToNumber } from "@/utils/string";
import { useSuspenseQuery } from "@tanstack/react-query";
import { like } from "typed-pocketbase";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";

interface ShopsListProps {
  keyword?: string;
}

export function ShopsList({ keyword = "" }: ShopsListProps) {
  const query = useSuspenseQuery({
    queryKey: ["property_tenants_list", keyword],
    queryFn: () => {
      return pb.from("property_shops").getList(1, 24, {
        filter: like("shop_number", keyword),
        select: {
          expand: {
            tenant: true,
          },
        },
      });
    },
  });
  const data = query.data;

  return (
    <ul className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[90%] flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          const tenant = item.expand?.tenant;

          return (
            <li
              key={item.id}
              className="relative rounded-xl flex w-[95%] items-center gap-3 bg-base-300 hover:text-primary p-3 sm:w-[45%] lg:w-[30%]"
            >
                  <div className="flex justify-between w-full gap-2">
                  <div className="max-w-[80%]">
                    <h1 className="w-full overflow-hidden overflow-ellipsis text-2xl font-bold">
                      {item.shop_number}
                    </h1>
                    <div className="w-full text-sm">{tenant?.name}</div>
                  </div>
                  {tenant && (
                    <div className="">
                      <Avatar>
                        <AvatarImage
                          alt={tenant.name}
                          src={`https://picsum.photos/id/${wordToNumber(tenant.name)}/30/30`}
                        />
                        <AvatarFallback>
                          {tenant.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>
  
            </li>
          );
        })}
      </div>
    </ul>
  );
}
