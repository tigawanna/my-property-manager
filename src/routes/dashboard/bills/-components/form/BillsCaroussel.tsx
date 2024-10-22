import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useState } from "react";
import { BillsForm } from "./BillsForm";
import { BillsPeriod, MonthlyBills } from "../api/bills";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useBillsQuery } from "../api/use-bills";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";

interface BillsCarousselProps {
  period: BillsPeriod;
}

export function BillsCaroussel({ period }: BillsCarousselProps) {
  const query = useBillsQuery(period);
  const bills = query.data.result;
  const searchParams = useSearch({
    from: "/dashboard/bills/",
  });
  const navigate = useNavigate({
    from: "/dashboard/bills",
  });

  const bill_idx = searchParams.bill || 0;
  const [currentBill, setCurrentBill] = useState(bill_idx);

  function nextBill() {
    if (currentBill < bills.length - 1) {
      setCurrentBill((prev) => {
        return prev + 1;
      });

      navigate({
        search: {
          bill: currentBill + 1,
          cm: period.curr_month,
          cy: period.curr_year,
          pm: period.prev_month,
          py: period.prev_year,
        },
      });
    }
  }
  function prevBill() {
    if (currentBill > 0) {
      setCurrentBill((prev) => {
        return prev - 1;
      });

      navigate({
        search: {
          bill: currentBill - 1,
          cm: period.curr_month,
          cy: period.curr_year,
          pm: period.prev_month,
          py: period.prev_year,
        },
      });
    }
  }

  const bill = bills[currentBill];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-outline btn-sm flex gap-2 px-2">
          <Plus />
          carrousel form
        </button>
      </DialogTrigger>

      <DialogContent
        className="min-h-[70vh] min-w-[60%] bg-base-300 p-5"
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "ArrowRight") {
            nextBill();
          }
          if (e.ctrlKey && e.key === "ArrowLeft") {
            prevBill();
          }
        }}
      >
        {bill && (
          <div className="h-full w-full">
            <DialogTitle>
              {" "}
              <div className="flex flex-col gap-2">
                <div className="font-bold "> {bill.shop_number}</div>
                {bill.shop_name}
                <div className="flex gap-0.5">
                  <div className="flex ">{currentBill}</div>/
                  <div className="flex">{bills.length}</div>
                </div>
              </div>
            </DialogTitle>

            <div className="flex h-full items-center justify-center">
              <button
                className="btn btn-sm flex gap-2 text-lg hover:text-accent"
                onClick={() => prevBill()}
              >
                <ChevronLeft />
              </button>
              <div className="">
                <BillsForm
                  bill={bill}
                  setOpen={() => {}}
                  key={currentBill}
                  next={nextBill}
                />
              </div>
              <button
                className="btn btn-sm flex gap-2 text-lg hover:text-accent"
                onClick={() => nextBill()}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
