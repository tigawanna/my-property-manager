import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPropertyQueryOptions } from "../query-options/payments-query-options";
import { pb } from "@/lib/pb/client";
import { GenericPocketbaseGenericTable } from "@/lib/pb/components/PocketbaseGenericTable";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { makeHotToast } from "@/components/toasters";
import { CreatePaymentForm } from "../form/CreatePaymentForm";
import { UpdatePaymentForm } from "../form/UpdatePaymentForm";
import { PaymentsTable } from "./PaymentsTable";
import { PBPickRelationField, PBPickRelationsDaisyUIDrawer } from "@/lib/pb/components/PBrelationPicker";
import { PropertyShopsResponse, PropertyStaffListResponse } from "@/lib/pb/database";
import { Edit } from "lucide-react";
import { useState } from "react";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};


interface PaymentsListProps {
  keyword: string;
  month: number;
  year: number;
  page: number;
}

export function PaymentsList({
  keyword,
  month,
  year,
  page,
}: PaymentsListProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery.data.record;
    // const [expansions, setExpansions] = useState<PaymentExpansion>({
    //   shop: [],
    //   // @ts-expect-error
    //   staff: [viewer],
    // });
  const query = useSuspenseQuery(
    listPropertyQueryOptions({ keyword, month, year, page }),
  );
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="payments"/>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-[99vw] overflow-auto">
        <PaymentsTable data={data} />
      </div>
    </div>
  );
}
