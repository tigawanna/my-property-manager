import { useSearch } from "@tanstack/react-router";
import { usePaymentsSearchQuery } from "./list/use-payments-hook";
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/loaders/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";
import { PaymentsList } from "./list/PaymentsList";
import { CreatePaymentForm } from "./form/CreatePaymentForm";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";

interface PaymentsPageProps {}

export function PaymentsPage({}: PaymentsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePaymentsSearchQuery();
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear(),page=1 } =
    useSearch({ from: "/dashboard/payments/" });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center gap-5 justify-center">
        <ListPageHeader
        title="Payments"
        formTrigger={<CreatePaymentForm />}
        searchBox={<SearchBox 
          inputProps={{
            placeholder: "Search by name",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
          />}
        
        />
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
