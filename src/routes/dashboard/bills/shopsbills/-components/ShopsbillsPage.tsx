
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";

import { CreateShopsbillsForm } from "./form/create";
import { ShopsbillsList } from "./list/ShopsbillsList";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";

interface ShopsbillsPageProps {
}

export function ShopsbillsPage({}: ShopsbillsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/bills/shopsbills");
  return (
    <div className="flex h-full w-full gap-5 flex-col items-center ">
      <Helmet title="bills | shopsbills" description="The list of shopsbills | shopsbills" />
      <ListPageHeader
        title="Shopsbills"
        formTrigger={<CreateShopsbillsForm />}
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
          <ShopsbillsList keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
