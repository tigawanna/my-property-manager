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
      <div className="sticky top-[10%] z-20 flex w-full flex-wrap justify-evenly gap-3 bg-base-200 px-3 pr-5">
          <h1 className="bg-base-200/30 text-2xl font-bold w-full md:w-[10%]">Shops</h1>
        {/* <div className="flex w-fit gap-2">
        </div> */}
        <div className="flex gap-2 w-[80%]">
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
