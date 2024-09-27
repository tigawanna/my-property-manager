import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ShopsList} from "./ShopsList";
import { useShopssSearchQuery } from "./use-shops-search";

interface ShopsContainerProps {

}

export function ShopsContainer({}:ShopsContainerProps){
    const { debouncedValue, isDebouncing, keyword, setKeyword } =
      useShopssSearchQuery();
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="w-full z-20 bg-base-200 sticky top-[10%]  px-3 flex flex-col md:flex-row justify-evenly gap-1 pr-5">
      <div className="w-full flex gap-2 p-1">
        <h1 className="text-2xl font-bold bg-base-200/30 ">Shops</h1>
      </div>
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
    <div className="w-full h-full flex justify-center items-center m-3 p-5">
        <Suspense fallback={<CardsListSuspenseFallback/>}>
          <ShopsList keyword={debouncedValue}/>
        </Suspense>
    </div>
  </div>
);
}
