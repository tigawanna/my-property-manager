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
      </div>
    </ul>
  );
}
