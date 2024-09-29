import { pb } from "@/lib/pb/client";
import { wordToNumber } from "@/utils/string";
import { useSuspenseQuery } from "@tanstack/react-query";
import { like } from "typed-pocketbase";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { listTenantsQueryOptions } from "../tenants-query-options";
import { TenantsCard } from "./TenantsCard";
import { Plus } from "lucide-react";
import { CreateTenantModal } from "../form/CreateTenant";

interface TenantsListProps {
  keyword?: string;
}

export function TenantsList({ keyword = "" }: TenantsListProps) {
  const query = useSuspenseQuery(listTenantsQueryOptions({ keyword }));
  const data = query.data;
  return (
    <ul className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[90%] flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          return <TenantsCard key={item.id} item={item} />;
        })}
        <div className="flex h-52 w-[95%] items-center justify-center rounded-xl bg-gradient-to-r from-base-300 to-base-200 sm:w-[45%] lg:w-[30%]">
          <CreateTenantModal
            trigger={
              <div className="">
                <Plus className="size-9" />
              </div>
            }
          />
        </div>
      </div>
    </ul>
  );
}
