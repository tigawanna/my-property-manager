import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useState, useTransition } from "react";
import { BillsForm } from "./BillsForm";
import { BillsPeriod } from "../api/bills";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useBillsQuery } from "../api/use-bills";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/shadcn/ui/alert-dialog";

interface BillsCarousselProps {
  period: BillsPeriod;
}

export function BillsCaroussel({ period }: BillsCarousselProps) {
  const [_, startTransition] = useTransition();
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
      startTransition(() => {
        setCurrentBill((prev) => {
          return prev + 1;
        });
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
      startTransition(() => {
        setCurrentBill((prev) => {
          return prev - 1;
        });
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="btn btn-outline btn-sm flex gap-2 px-2">
          <Plus />
          carrousel form
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="h-fit max-h-[90%] min-h-[50vh] min-w-[60%] bg-base-300 p-5"
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
          <div className="h-full w-full flex flex-col gap-2 justify-evenly ">
            <AlertDialogHeader className="">
              <AlertDialogTitle>
                <div className="flex flex-col">
                  <div className="text-5xl font-bold"> {bill.shop_number}</div>

                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold"> {bill.shop_name}</div>
                    <div className="flex gap-0.5 text-xl font-normal">
                      <div className="flex">{currentBill}</div>/
                      <div className="flex">{bills.length}</div>
                    </div>
                  </div>
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription className="">
                Use the ctrl + left and right arrows to navigate between bills
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogCancel  className="absolute right-2 top-2">
              <X className="size-6 text-accent"/> 
            </AlertDialogCancel>
            <div className="flex min-h-fit items-center justify-center">
              <button
                className="btn btn-sm flex gap-2 text-lg hover:text-accent"
                onClick={() => prevBill()}
              >
                <ChevronLeft />
              </button>
              <div className="min-h-fit p-2 ">
                <BillsForm
                  bill={bill}
                  setOpen={() => {}}
                  key={currentBill}
                  next={nextBill}
                />
              </div>
              <button
                type="button"
                className="btn btn-sm flex gap-2 text-lg hover:text-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  nextBill();
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
