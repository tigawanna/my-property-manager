import { useSuspenseQuery } from "@tanstack/react-query";
import { listTenantsQueryOptions } from "../tenants-query-options";
import { TenantsCard } from "./TenantsCard";
import { Plus } from "lucide-react";
import { CreateTenantModal } from "../form/CreateTenant";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface TenantsListProps {
  keyword?: string;
}

export function TenantsList({ keyword = "" }: TenantsListProps) {
  const { role } = useViewer();
  const query = useSuspenseQuery(listTenantsQueryOptions({ keyword }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="tenants" />
      </div>
    );
  }
  return (
    <ul className="flex h-full w-full flex-col items-center justify-center">
      <div className="@container/tenants flex w-[90%] flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          return <TenantsCard key={item.id} item={item} />;
        })}
        {role === "staff" && (
          <div className="flex h-52 w-[95%] items-center justify-center rounded-xl bg-gradient-to-r from-base-300 to-base-200 sm:w-[45%] lg:w-[30%]">
            <CreateTenantModal
              trigger={
                <div className="">
                  <Plus className="size-9" />
                </div>
              }
            />
          </div>
        )}
      </div>
    </ul>
  );
}
