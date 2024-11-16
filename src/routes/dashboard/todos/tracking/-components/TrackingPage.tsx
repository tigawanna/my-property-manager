
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Suspense } from "react";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateTrackingForm } from "./form/create";
import { TrackingList } from "./list/TrackingList";

interface TrackingPageProps {
}

export function TrackingPage({}: TrackingPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/todos/tracking");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ListPageHeader
        title="Tracking"
        formTrigger={<CreateTrackingForm />}
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
          <TrackingList keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
