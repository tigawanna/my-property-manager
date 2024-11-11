import { useSearch } from "@tanstack/react-router";
import { usePaymentsSearchQuery } from "./list/use-payments-hook";
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";
import { PaymentsList } from "./list/PaymentsList";
import { CreatePaymentForm } from "./form/CreatePaymentForm";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { PaymentsPagination, PaymentsYearPagination } from "./list/PaymentsPagination";
import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";

interface PaymentsPageProps {}

export function PaymentsPage({}: PaymentsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePaymentsSearchQuery();
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear(),page=1 } =
    useSearch({ from: "/dashboard/payments/" });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <ListPageHeader
          title="Payments"
          formTrigger={<CreatePaymentForm />}
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 pb-3">
          <PaymentsYearPagination year={year} month={month}/>
        <Suspense fallback={<GeneriicTableSkeleton />}>
            <PaymentsList
              month={month}
              year={year}
              keyword={debouncedValue}
              page={page}
            />
          </Suspense>
          <PaymentsPagination month={month} year={year}/>
        </div>
      </div>
    </div>
  );
}
