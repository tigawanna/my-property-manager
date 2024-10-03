import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ShopsList } from "./ShopsList";
import { useShopssSearchQuery } from "./use-shook-hooks";
import { SelectHouseFloor } from "./SelectHouseFloor";
import { useSearch } from "@tanstack/react-router";


interface ShopsContainerProps {}

export function ShopsContainer({}: ShopsContainerProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    useShopssSearchQuery();
  const { floor } = useSearch({ from: "/dashboard/shops/" });
  // console.log({houseFloor})
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="sticky top-[10%] z-20 flex w-full flex-col justify-evenly gap-1 bg-base-200 px-3 pr-5 md:flex-row">
        <div className="flex w-full gap-2 p-1">
          <h1 className="bg-base-200/30 text-2xl font-bold">Shops</h1>
        </div>
        <SelectHouseFloor />
        <SearchBox
          inputProps={{
            placeholder: "Search by name",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          {/* @ts-expect-error */}
          <ShopsList keyword={debouncedValue} floor={floor ?? ""} />
        </Suspense>
      </div>
    </div>
  );
}
