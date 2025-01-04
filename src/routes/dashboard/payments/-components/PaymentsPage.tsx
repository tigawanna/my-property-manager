import { useSearch } from "@tanstack/react-router";
import { usePaymentsSearchQuery } from "./list/use-payments-hook";
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { PaymentsList } from "./list/PaymentsList";
import { CreatePaymentForm } from "./form/CreatePaymentForm";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import {
  PaymentsPagination,
  PaymentsYearPagination,
} from "./list/PaymentsPagination";
import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { PaymentRangeSelect, PaymentTypeSelect } from "./list/PaymentTypeSelect";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";

interface PaymentsPageProps {}

export function PaymentsPage({}: PaymentsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePaymentsSearchQuery();
  const {
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear(),
    page = 1,
    type="",
    range="monthly",
  } = useSearch({ from: "/dashboard/payments/" });
  const { role } = useViewer();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="mb-4 flex h-full min-h-screen w-full flex-col items-center justify-between gap-5">
        <ListPageHeader
          title="Payments"
          formTrigger={role === "staff" && <CreatePaymentForm />}
          searchBox={
            <div className="flex w-full gap-2">
              <PaymentTypeSelect />
              <PaymentRangeSelect />
              {role === "staff" && (
                <SearchBox
                  inputProps={{
                    placeholder: "Search by tenant name",
                  }}
                  debouncedValue={debouncedValue}
                  isDebouncing={isDebouncing}
                  setKeyword={setKeyword}
                  keyword={keyword}
                />
              )}
            </div>
          }
        />
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 pb-3">
          <PaymentsYearPagination year={year} month={month} />
          <Suspense
            fallback={
              <div className="h-full w-full">
                <div className="hidden lg:block">
                  <GeneriicTableSkeleton />
                </div>
                <div className="h-full w-full lg:hidden">
                  <CardsListSuspenseFallback />
                </div>
              </div>
            }
          >
            <PaymentsList
              type={type}
              month={month}
              year={year}
              keyword={debouncedValue}
              page={page}
              range={range}
            />
          </Suspense>
        </div>
        {range === "monthly" && (
          <PaymentsPagination month={month} year={year} />
        )}
      </div>
    </div>
  );
}
