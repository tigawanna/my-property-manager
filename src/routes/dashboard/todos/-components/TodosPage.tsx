
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Suspense } from "react";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateTodosForm } from "./form/create";
import { TodosList } from "./list/TodosList";

interface TodosPageProps {
}

export function TodosPage({}: TodosPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/todos");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
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

      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <TodosList keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
