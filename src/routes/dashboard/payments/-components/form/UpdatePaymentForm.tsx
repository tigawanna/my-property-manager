import { pb } from "@/lib/pb/client";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import {
  PropertyShopPaymentsUpdate,
  PropertyShopsResponse,
  PropertyStaffListResponse,
} from "@/lib/pb/database";
import { FieldInfo } from "@/lib/tanstack/form/components";
import { SelectFields } from "@/lib/tanstack/form/SelectFileds";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { Edit, X } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { BasePaymentsForm } from "./BasePaymentsForm";

interface UpdatePaymentFormProps {
  row: PropertyShopPaymentsUpdate;
  afterSave?: () => void;
}

type PaymentExpansion = {
  shop: PropertyShopsResponse[];
  staff: PropertyStaffListResponse[];
};
export function UpdatePaymentForm({ row, afterSave }: UpdatePaymentFormProps) {


  const mutation = useMutation({
    mutationFn: async (value: PropertyShopPaymentsUpdate) => {
      pb.from("property_shop_payments").update(
        // @ts-expect-error
        row?.id,
        value,
      );
    },
  });

  return (
    <div className="h-full w-full flex justify-center items-center ">
      <BasePaymentsForm mutation={mutation} row={row} afterSave={afterSave} />
    </div>
  );
}


interface UpdatePaymentFormDrawerProps {
  row: PropertyShopPaymentsUpdate;
}

export function UpdatePaymentFormDrawer({row}: UpdatePaymentFormDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Edit className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="flex min-h-fit  flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-[90%] md:max-w-[60%] flex-col items-center justify-center">
          <DrawerHeader>
            <DrawerTitle>Update payment</DrawerTitle>
            <DrawerDescription>Update you payment details</DrawerDescription>
          </DrawerHeader>
          <UpdatePaymentForm row={row} />
          <DrawerFooter>
            <DrawerClose asChild>
              <X className="absolute right-[2%] top-[2%] size-7" />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
