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

export function MutateBill({ bill }: MutateBillProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(isopen) => setOpen(isopen)}>
      <DialogTrigger asChild>
        <Edit2 className="h-5 w-5 hover:text-accent" />
      </DialogTrigger>

      <DialogContent className="min-w-[60%] rounded-xl border-primary bg-base-300 p-5">
        <DialogTitle className="flex flex-col text-2xl">
          <div className="font-bold text-primary">{bill.shop_number}</div>
          <div className="text-base">{bill.shop_name}</div>
        </DialogTitle>
        <DialogDescription>
          {/* Make changes to your profile here. Click save when you're done. */}
        </DialogDescription>

        <BillsForm bill={bill} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
