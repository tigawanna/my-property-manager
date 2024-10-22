import { useSearch } from "@tanstack/react-router";
import { usePaymentsSearchQuery } from "./list/use-payments-hook";
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";
import { PaymentsList } from "./list/PaymentsList";
import { TestDrawer } from "./test/TestDrawer";
import { CreatePaymentForm } from "./form/CreatePaymentForm";

interface PaymentsPageProps {}

export function PaymentsPage({}: PaymentsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePaymentsSearchQuery();
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear(),page=1 } =
    useSearch({ from: "/dashboard/payments/" });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center gap-5 justify-center">
        <div className="sticky top-[10%] z-20 flex w-full flex-wrap justify-between gap-3 px-3 pr-5">
          <div className="flex gap-5  w-full md:w-fit items-center justify-between">
            <h1 className="text-2xl font-bold">Payments</h1>
            <div className="">
              <CreatePaymentForm />
            </div>
          </div>

          <div className="flex w-full  flex-1 min-w-[30%] gap-2 md:w-fit">
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
        <div className="flex h-full w-full items-center justify-center">
          <Suspense fallback={<CardsListSuspenseFallback />}>
            <PaymentsList
              month={month}
              year={year}
              keyword={debouncedValue}
              page={page}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
