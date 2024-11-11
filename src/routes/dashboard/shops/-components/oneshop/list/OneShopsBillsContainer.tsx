import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { Suspense } from "react";
import { ShopsBillsList } from "./OneShopBillsList";
import { PaginateOneShopBills } from "./PaginateOneShopBills";

interface OneShopsBillsContainerProps {
  shop: string;
}

export function OneShopsBillsContainer({ shop }: OneShopsBillsContainerProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="sticky top-[10%] z-20 flex w-full flex-col justify-evenly gap-1 bg-base-200 px-3 pr-5 md:flex-row">
        <div className="flex w-full gap-2 p-1">
          <h1 className="bg-base-200/30 text-2xl font-bold">Shop Bills</h1>
        </div>
      </div>
      <div className="m-3 flex h-full w-full flex-col items-center justify-center p-5">
        <PaginateOneShopBills shop={shop} />
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <ShopsBillsList />
        </Suspense>
      </div>
    </div>
  );
}
