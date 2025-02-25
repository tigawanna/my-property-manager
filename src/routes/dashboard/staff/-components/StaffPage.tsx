import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Suspense } from "react";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateStaffForm } from "./form/create";
import { StaffList } from "./list/StaffList";

interface StaffPageProps {
}

export function StaffPage({}: StaffPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/staff");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ListPageHeader
        title="Staff"
        formTrigger={<CreateStaffForm />}
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
          <StaffList keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
