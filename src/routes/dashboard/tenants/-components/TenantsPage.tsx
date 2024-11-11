import { SearchBox } from "@/components/search/SearchBox";
import { useTenantsSearchQuery } from "./list/use-search";
import { Suspense } from "react";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { TenantsList } from "./list/TenantsList";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Plus } from "lucide-react";
import { CreateTenantModal } from "./form/CreateTenant";

interface TenantsPageProps {}

export function TenantsPage({}: TenantsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    useTenantsSearchQuery();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ListPageHeader
        title="Tenants"
        formTrigger={
          <CreateTenantModal
            trigger={
              <div className="btn btn-sm btn-outline">
                <Plus className="" />
                add
              </div>
            }
          />
        }
        searchBox={
          <SearchBox
            inputProps={{
              placeholder: "Search by name",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        }
      />
      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <TenantsList keyword={debouncedValue} />
        </Suspense>
      </div>
    </div>
  );
}
