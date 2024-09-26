import * as Dialog from "~/components/park/ui/dialog";
import { useState } from "react";
import { Edit2 } from "lucide-react";
import { BillsForm } from "./BillsForm";
import { MonthlyBills } from "../api/bills";




interface MutateBillProps {
  bill: MonthlyBills;

}

export function MutateBill({bill}:MutateBillProps){
const [open,setOpen]=useState(false)
return (
  <Dialog.Root open={open} onOpenChange={(details)=>setOpen(details.open)} >
    <Dialog.Trigger asChild>
      <Edit2 className="h-5 w-5 hover:text-accent" />
    </Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content className="min-w-[60%] p-5 bg-bg-emphasized">
        <Dialog.Title className="gap-1 flex flex-col">
          <div className="text-accent font-bold">{bill.shop_number}</div>
          {bill.shop_name}
        </Dialog.Title>
        <Dialog.Description>
          {/* Make changes to your profile here. Click save when you're done. */}
        </Dialog.Description>

        <BillsForm bill={bill} setOpen={setOpen} />
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
);
}
