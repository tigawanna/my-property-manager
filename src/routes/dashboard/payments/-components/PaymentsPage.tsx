import { useSearch } from "@tanstack/react-router";
import { usePaymentsSearchQuery } from "./list/use-payments-hook";
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";
import { PaymentsList } from "./list/PaymentsList";

interface PaymentsPageProps {}

export function PaymentsPage({}: PaymentsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePaymentsSearchQuery();
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear(),page=1 } =
    useSearch({ from: "/dashboard/payments/" });
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="sticky top-[10%] z-20 flex w-full flex-wrap justify-between gap-3 bg-base-200 px-3 pr-5">
          <h1 className="bg-base-200/30 text-2xl font-bold ">
            Payments
          </h1>
          {/* <div className="flex w-fit gap-2">
        </div> */}
          <div className="flex min-w-[50%] gap-2">
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
                <PaymentsList month={month} year={year} keyword={debouncedValue} page={page}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
