
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import ResponsivePagination from "react-responsive-pagination";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { UpdateShopsbillsform } from "@/routes/dashboard/bills/shopsbills/-components/form/update";
import { shopsbillsListQueryOptions } from "@/routes/dashboard/bills/shopsbills/-query-options/shopsbills-query-option";

interface ShopsbillsListProps {
  keyword?: string;
}

export function ShopsbillsList({ keyword = "" }: ShopsbillsListProps) {
  const { page,updatePage } = usePageSearchQuery("/dashboard/bills/shopsbills");
  const query = useSuspenseQuery(shopsbillsListQueryOptions({ keyword,page }));
  const data = query.data;
  const error = query.error;
  console.log("==== DATA ====", data);
  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ErrorWrapper err={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="Shopsbills" />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <ul className="w-[95%] min-h-[80vh] flex flex-wrap justify-center p-2 gap-2">
        {data.items.map((item) => {
          return (
            <li
              key={item.id}
              className=" w-[95%]  rounded-xl bg-base-300 p-2 flex justify-center items-center gap-2 "
            >
              <div className="flex flex-col gap-2 w-full h-full justify-between">
              <div className="flex  gap-2 w-full h-full justify-between">
              <h1 className="text-xl font-bold">
              {item.id}
              </h1>
              <UpdateShopsbillsform item={item} />
              </div>

              </div>
            </li>
          );
        })}
      </ul>
            <div className="flex w-full items-center justify-center">
        <ResponsivePagination
          current={page ?? 1}
          total={data.totalPages}
          onPageChange={(e) => {
            updatePage(e);
          }}
        />
      </div>
    </div>
  );
}


