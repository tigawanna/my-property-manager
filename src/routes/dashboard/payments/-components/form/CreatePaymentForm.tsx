import { pb } from "@/lib/pb/client";
import { PropertyShopPaymentsCreate } from "@/lib/pb/pb-types";
import { useMutation } from "@tanstack/react-query";
import { BasePaymentsForm } from "./BasePaymentsForm";
import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { makeHotToast } from "@/components/toasters";

interface CreatePaymentFormProps {}

export function CreatePaymentForm({}: CreatePaymentFormProps) {
  const [open, setOpen] = useState(false);
  // const { userQuery } = useViewer();
  // const viewer = userQuery?.data?.record!;
  const mutation = useMutation({
    mutationFn: (value: PropertyShopPaymentsCreate) => {
      return pb.from("property_shop_payments").create(value);
    },
    onSuccess: () => {
      makeHotToast({
        title: "Payment created",
        description: "Payment has been created successfully",
        variant:"success"
      })
      setOpen(false);
    },
    onError(error, variables, context) {
      makeHotToast({
        title: "Something went wrong",
        description:error.message,
        variant:"error"
      })
    },
    meta: {
      invalidates: ["property_shops_payments"],
    },
  });
  const defaultRow = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    amount: 5000,
    reciept_number: "R-" + Math.floor(Math.random() * 100000),
    type: "rent",
  } as const;
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Create Payment"
      description="Create a new payment"
      trigger={
        <button className="btn btn-outline btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }
    >
      <div className="flex h-full max-h-[80vh] w-fit flex-col gap-2 overflow-auto">
        {/* @ts-expect-error */}
        <BasePaymentsForm mutation={mutation} row={defaultRow} />
      </div>
    </DiaDrawer>
  );
}
