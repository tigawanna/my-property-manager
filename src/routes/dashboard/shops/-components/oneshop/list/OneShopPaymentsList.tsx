import { useSuspenseQuery } from "@tanstack/react-query";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import {
  oneShopPaymentsQueryOptions,
} from "../../query-options/shops-query-options";
import { useParams, useSearch } from "@tanstack/react-router";
import { GenericTable } from "@/components/wrappers/GenericTable";
import { pb } from "@/lib/pb/client";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { PaginateOneShopBills } from "./PaginateOneShopBills";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";
import { PaymentsCard } from "@/routes/dashboard/payments/-components/list/PaymentsCard";

interface SOneShopPaymentsListrops {}

export function OneShopPaymentsList({}: SOneShopPaymentsListrops) {
  const { shop } = useParams({
    from: "/dashboard/shops/$shop/",
  });
  const { cy } = useSearch({ from: "/dashboard/shops/$shop/" });
  const selectedYear = cy ?? new Date().getFullYear();
  const query = useSuspenseQuery(
    oneShopPaymentsQueryOptions({ shop, year: selectedYear }),
  );
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
          <ItemNotFound label="shop payments" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="hidden w-full p-2 lg:flex">
        <GenericTable
          rows={data.items}
          updateItem={(item) =>
            pb.from("property_shop_payments").update(item.id, item)
          }
          columns={[
            { label: "reciept", type: "text", accessor: "reciept_number" },
            { label: "amount", type: "number", accessor: "amount" },
            { label: "type", type: "text", accessor: "type" },
            { label: "month", type: "number", accessor: "month" },
            { label: "year", type: "number", accessor: "year" },
          ]}
        />
      </div>
      <ul className="flex w-full flex-wrap justify-center gap-2 p-2 lg:hidden">
        {data.items.map((item) => {
          return <PaymentsCard key={item.id} payment={item} />;
        })}
      </ul>
    </div>
  );
}

interface OneShopsPaymentsContainerProps {
  shop: string;
}

export function OneShopsPaymentsContainer({ shop }: OneShopsPaymentsContainerProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="sticky top-[10%] z-20 flex w-full flex-col justify-evenly gap-1 bg-base-200 px-3 pr-5 md:flex-row">
        <div className="flex w-full gap-2 p-1">
          <h1 className="bg-base-200/30 text-2xl font-bold">Shop payments</h1>
        </div>
      </div>
      <div className="m-3 flex h-full w-full flex-col items-center justify-center p-5">
        <PaginateOneShopBills shop={shop} />
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <OneShopPaymentsList />
        </Suspense>
      </div>
    </div>
  );
}
