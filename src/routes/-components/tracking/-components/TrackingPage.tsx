import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";
import { PaymentsList } from "@/routes/dashboard/payments/-components/list/PaymentsList";
import { Suspense } from "react";
import { LoadDocument } from "./LoadDocument";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { SearchBox } from "@/components/search/SearchBox";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { CreateTodosForm } from "../../-components/form/create";

interface TrackingPageProps {

}

export function TrackingPage({}:TrackingPageProps){
     const { debouncedValue, isDebouncing, keyword, setKeyword } =
       usePageSearchQuery("/dashboard/todos/tracking");
return (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <ListPageHeader
      title="Todos"
      formTrigger={<CreateTodosForm />}
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
    <LoadDocument />
    <Suspense fallback={<GeneriicTableSkeleton />}>
    </Suspense>
  </div>
);
}
