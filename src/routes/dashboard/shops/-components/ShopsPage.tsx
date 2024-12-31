import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { SearchBox } from "@/components/search/SearchBox";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import { SelectHouseFloor } from "./list/SelectHouseFloor";
import { useShopssSearchQuery } from "./list/use-shook-hooks";
import { Plus } from "lucide-react";
import { ShopsList } from "./list/ShopsList";
import { CreateShopModal } from "./form/CreateShops";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface ShopsPageProps {}

export function ShopsPage({}: ShopsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    useShopssSearchQuery();
  const { floor } = useSearch({ from: "/dashboard/shops/" });
    const { role } = useViewer();
  // console.log({houseFloor})
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ListPageHeader
        title="Shops"
        formTrigger={
         role==="staff"&& <CreateShopModal
            trigger={
              <div className="btn btn-outline btn-sm">
                <Plus className="" />
                add
              </div>
            }
          />
        }
        searchBox={
          <div className="flex w-full gap-2">
            <SelectHouseFloor />
            <SearchBox
              inputProps={{
                placeholder: "Search by shop number",
              }}
              debouncedValue={debouncedValue}
              isDebouncing={isDebouncing}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          </div>
        }
      />

      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <ShopsList keyword={debouncedValue} floor={(floor ?? "")} />
        </Suspense>
      </div>
    </div>
  );
}
