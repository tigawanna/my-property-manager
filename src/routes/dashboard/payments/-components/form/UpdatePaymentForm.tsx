import { pb } from "@/lib/pb/client";
import {
  PropertyShopPaymentsUpdate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { useMutation } from "@tanstack/react-query";
import { Edit, X } from "lucide-react";
import { BasePaymentsForm } from "./BasePaymentsForm";
import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";

interface UpdatePaymentFormProps {
  row: PropertyShopPaymentsUpdate;
}

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};
export function UpdatePaymentForm({ row }: UpdatePaymentFormProps) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (value: PropertyShopPaymentsUpdate) => {
     return pb.from("property_shop_payments").update(
        // @ts-expect-error
        row?.id,
        value,
      );
    },
    meta: {
      invalidates: ["property_shops_payments"],
    },
    onSuccess:() => {
      setOpen(false);
    }
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title="Create Payment"
        description="Create a new payment"
        trigger={<Edit className="size-5" />}
      >
        <div className="flex h-full max-h-[80vh] w-fit flex-col gap-2 overflow-auto">
          <BasePaymentsForm
            mutation={mutation}
            row={row}
          />
        </div>
      </DiaDrawer>
    </div>
  );
}



