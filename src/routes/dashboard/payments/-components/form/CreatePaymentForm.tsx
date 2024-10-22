import { pb } from "@/lib/pb/client";
import {
  PropertyShopPaymentsCreate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { useMutation } from "@tanstack/react-query";
import { BasePaymentsForm } from "./BasePaymentsForm";
import { useScrollRestoration } from "@tanstack/react-router";
import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface CreatePaymentFormProps {}

export function CreatePaymentForm({}: CreatePaymentFormProps) {
  const [open, setOpen] = useState(false);
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record!;
  const mutation = useMutation({
    mutationFn: async (value: PropertyShopPaymentsCreate) => {
      pb.from("property_shop_payments").create(value);
    },
  });
  const defaultRow = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    amount: 5000,
    staff: viewer?.id,
    type: "rent",
  } as const;
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Create Payment"
      description="Create a new payment"
      trigger={
      <button className="btn btn-sm btn-outline flex justify-center items-center gap-2">
        <Plus className="" />
        Add new
      </button>
    }
    >
      <div className="flex w-fit h-[90%]  max-h-[80vh] flex-col  gap-2 overflow-auto">
      <BasePaymentsForm
        mutation={mutation}
        row={defaultRow}

      />
      </div>
    </DiaDrawer>
  );
}
