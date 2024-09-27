
import { useState } from "react";
import { Edit2 } from "lucide-react";
import { BillsForm } from "./BillsForm";
import { MonthlyBills } from "../api/bills";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";

interface MutateBillProps {
  bill: MonthlyBills;
}

export function MutateBill({bill}:MutateBillProps){
const [open,setOpen]=useState(false)
return (
  <Dialog open={open} onOpenChange={(isopen)=>setOpen(isopen)} >
    <DialogTrigger asChild>
      <Edit2 className="h-5 w-5 hover:text-accent" />
    </DialogTrigger>

      <DialogContent className="min-w-[60%] p-5 bg-bg-emphasized">
        <DialogTitle className="gap-1 flex flex-col">
          <div className="text-accent font-bold">{bill.shop_number}</div>
          {bill.shop_name}
        </DialogTitle>
        <DialogDescription>
          {/* Make changes to your profile here. Click save when you're done. */}
        </DialogDescription>

        <BillsForm bill={bill} setOpen={setOpen} />
      </DialogContent>

  </Dialog>
);
}
