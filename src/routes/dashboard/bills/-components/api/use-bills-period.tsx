import { getPrevMonthandYear } from "@/utils/date-helpers";
import { useState, useEffect} from "react";
import { MonthlyBills, BillsPeriod } from "./bills";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";


export type BillStatus ="prev_curr"|"prev_no_curr"|"no_prev_no_curr"
export function isBillingNewMonth(bill: MonthlyBills): BillStatus {
  if (bill.prev_bill_id === "blank" && bill.curr_bill_id === "blank") {
    return "no_prev_no_curr";
  }

  const prev_month = parseInt(bill.prev_month);
  const prev_year = parseInt(bill.prev_year);
  if (
    bill.prev_bill_id !== "blank" &&
    bill.curr_bill_id === "blank" &&
    prev_month === getPrevMonthandYear().month &&
    prev_year === getPrevMonthandYear().year
  ) {
    return "prev_no_curr";
  }

  return "prev_curr";
}


export interface BillsInput {
  curr_elec: string;
  curr_water: string;
  prev_elec: string;
  prev_water: string;
}

export function genInitValues(bill: MonthlyBills, is_new_bill: BillStatus) {
  if (is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr") {
    return {
      curr_elec: bill.previous_elec,
      curr_water: bill.previous_water,
      prev_elec: bill.previous_elec,
      prev_water: bill.previous_water,
    };
  }
  return {
    curr_elec: bill.current_elec,
    curr_water: bill.current_water,
    prev_elec: bill.previous_elec,
    prev_water: bill.previous_water,
  };
}


export function currentMonthAndYear() {
  return {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }
}

export function caclulatePeriod(month: number, year: number): BillsPeriod {
  return {
    curr_month: month,
    curr_year: year,
    prev_month: getPrevMonthandYear(month).month,
    prev_year: getPrevMonthandYear(month).year,
  };
}

export function getDefaultPeriod() {
  return caclulatePeriod(currentMonthAndYear().month, currentMonthAndYear().year);
}

export function useBillsPeriod() {
  const searchParams = useSearch({ from: "/dashboard/bills/" });
  const navigate = useNavigate({ from: "/dashboard/bills" });

  const search_params_curr_month = searchParams.cm;
  const search_params_curr_year = searchParams.cy;
  const search_params_prev_month = searchParams.pm;
  const search_params_prev_year = searchParams.py;

  const curr_month = search_params_curr_month
    ? search_params_curr_month
    : new Date().getMonth() + 1;
  const curr_year = search_params_curr_year ? search_params_curr_year : new Date().getFullYear();
  const prev_month = search_params_prev_month
    ? search_params_prev_month
    : getPrevMonthandYear(curr_month).month;
  const prev_year = search_params_prev_year
    ? search_params_prev_year
    : getPrevMonthandYear(curr_month).year;

  const [period, setPeriod] = useState({
    curr_month,
    curr_year,
    prev_month,
    prev_year,
  });

  useEffect(() => {
    if (
      period.curr_month !== curr_month ||
      period.curr_year !== curr_year ||
      period.prev_month !== prev_month ||
      period.prev_year !== prev_year
    ) {
      navigate({
        search: {
          cm: period.curr_month,
          cy: period.curr_year,
          pm: period.curr_month,
          py: period.curr_year,
        },
      });
    }
  }, [period]);

  return {
    period,
    setPeriod,
  };
}
