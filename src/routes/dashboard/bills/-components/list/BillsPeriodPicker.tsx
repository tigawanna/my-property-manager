import { Minus, Plus, Printer } from "lucide-react";
import { BillsPeriod } from "../api/bills";
import { useTransition } from "react";
import { Link } from "@tanstack/react-router";
import { BillsCaroussel } from "../form/BillsCaroussel";

interface BillsPeriodPickerProps {
  period: BillsPeriod;
  setPeriod: React.Dispatch<React.SetStateAction<BillsPeriod>>;
}

export function BillsPeriodPicker({ period, setPeriod }: BillsPeriodPickerProps) {
  const [_, startTransition] = useTransition();
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full  flex flex-col items-center justify-center p-1">
      <div className="w-full h-full flex flex-col md:flex-row md:gap-4 items-center justify-center">
        <div className=" flex justify-center items-center gap-1 border rounded-lg">
          <PlusMinusYear
            value={period.curr_year}
            setValue={(value) => startTransition(() => setPeriod({ ...period, curr_year: value }))}
            maxYear={currentYear + 5}
            minYear={period.prev_year}
          />
          /
          <PlusMinusMonth
            value={period.curr_month}
            setValue={(value) => startTransition(() => setPeriod({ ...period, curr_month: value }))}
          />
        </div>
        <div className="flex gap-3 justify-center items-center">
          <h1 className="md:text-3xl">bills</h1>
          <BillsCaroussel period={period} />
        <Link
          to="/dashboard/bills/print"
          search={{
            cm: period.curr_month,
            cy: period.curr_year,
            pm: period.prev_month,
            py: period.prev_year,
          }}>
          <Printer />
        </Link>
        </div>

        <div className=" flex justify-center items-center gap-1 border rounded-lg">
          <PlusMinusYear
            value={period.prev_year}
            setValue={(value) => startTransition(() => setPeriod({ ...period, prev_year: value }))}
            maxYear={period.curr_year}
            minYear={currentYear - 5}
          />
          /
          <PlusMinusMonth
            value={period.prev_month}
            setValue={(value) => startTransition(() => setPeriod({ ...period, prev_month: value }))}
          />
        </div>
      </div>
    </div>
  );
}

interface PlusMinusMonthProps {
  value: number;

  setValue: (value: number) => void;
}

export function PlusMinusMonth({ value, setValue }: PlusMinusMonthProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex gap-1 items-center justify-center">
        <button disabled={value === 12} className="btn btn-ghost">
          <Plus
            onClick={() => {
              if (value > 0) {
                setValue(value + 1);
              }
              if (value === 12) {
                setValue(1);
              }
            }}
          />
        </button>
        {value}
        <button disabled={value === 1} className="btn btn-ghost">
          <Minus
            onClick={() => {
              if (value > 1) {
                setValue(value - 1);
              }
              value > 1;
            }}
          />
        </button>
      </div>
    </div>
  );
}
interface PlusMinusYearProps {
  value: number;

  setValue: (value: number) => void;
  minYear?: number;
  maxYear?: number;
}

export function PlusMinusYear({ value, setValue, maxYear, minYear }: PlusMinusYearProps) {
  return (
    <div className="w-full flex flex-col gap-1 items-center justify-center">
      <div className="w-full flex gap-1 items-center justify-center">
        <button disabled={value === maxYear} className="btn btn-ghost">
          <Plus
            onClick={() => {
              if (value > 0) {
                setValue(value + 1);
              }
              if (minYear && value === maxYear) {
                setValue(minYear);
              }
            }}
          />
        </button>
        {value}
        <button disabled={value === minYear} className="btn btn-ghost">
          <Minus
            onClick={() => {
              if (value > 1) {
                setValue(value - 1);
              }
              value > 1;
            }}
          />
        </button>
      </div>
    </div>
  );
}
