import { useMutation } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { BillMutationFields, MonthlyBills } from "../api/bills";
import { PropertyBillsCreate, PropertyBillsUpdate } from "@/lib/pb/pb-types";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useForm } from "@tanstack/react-form";
import {
  BillsInput,
  genInitValues,
  isBillingNewMonth,
  useBillsPeriod,
} from "../api/use-bills-period";
import { pb } from "@/lib/pb/client";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { z } from "zod";
import { makeHotToast } from "@/components/toasters";
import { PlusMinusMonth, PlusMinusYear } from "../list/BillsPeriodPicker";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface BillsFormProps {
  bill: MonthlyBills;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  next?: () => void;
}

export function BillsForm({ bill, setOpen, next }: BillsFormProps) {
  const searchParams = useSearch({
    from: "/dashboard/bills/",
  });
  const navigate = useNavigate({
    from: "/dashboard/bills",
  });
  const [_, startTransition] = useTransition();
  const is_new_bill = isBillingNewMonth(bill);
  const { period } = useBillsPeriod();
  const [formPeriod, setFormPeriod] = useState({
    month: period.curr_month,
    year: period.curr_year,
  });
  const [initBill] = useState<BillsInput>(genInitValues(bill, is_new_bill));

  const new_bill_mutation = useMutation({
    mutationFn: (input: PropertyBillsCreate) => {
      return pb.from("property_bills").create(input, {
        select: {
          expand: {
            shop: true,
          },
        },
      });
    },
    meta: { invalidates: ["monthly-bills"] },
    onError(error) {
      makeHotToast({
        title: "Something went wrong",
        description: `${error.message}`,
        variant: "error",
        position: "top-center",
      });
    },
    onSuccess() {
      makeHotToast({
        title: "Successfully created billing",
        description: "Bill updated succesfully",
        variant: "success",
        position: "top-center",
      });
      next?.();
      setOpen(false);
    },
  });

  const update_bill_mutation = useMutation({
    mutationFn: (input: PropertyBillsUpdate & { id: string }) => {
      return pb.from("property_bills").update(input.id, input, {
        select: {
          expand: {
            shop: true,
          },
        },
      });
    },
    meta: { invalidates: ["monthly-bills"] },
    onError(error) {
      makeHotToast({
        title: "Something went wrong",
        description: "Bill updating failed",
        variant: "error",
        position: "top-center",
      });
    },
    onSuccess() {
      makeHotToast({
        title: "Success",
        description: "Bill updated",
        variant: "success",
      });
      next?.();
      setOpen(false);
    },
  });

  function handleSubmit(input: BillsInput) {
    if (is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr") {
      const new_bill: BillMutationFields = {
        elec_readings: parseFloat(parseFloat(input.curr_elec).toFixed(2)),
        water_readings: parseFloat(parseFloat(input.curr_water).toFixed(2)),
        shop: bill.shop_id,
        month: searchParams.sm ?? period.curr_month,
        year: searchParams.sy ?? period.curr_year,
      };
      new_bill_mutation.mutate(new_bill);
      return;
    }

    if (
      initBill.curr_elec !== input.curr_elec ||
      initBill.curr_water !== input.curr_water
    ) {
      const new_bill: PropertyBillsUpdate & { id: string } = {
        elec_readings: parseFloat(parseFloat(input.curr_elec).toFixed(2)),
        water_readings: parseFloat(parseFloat(input.curr_water).toFixed(2)),
        shop: bill.shop_id,
        month: parseInt(bill.curr_month),
        year: parseInt(bill.curr_year),
        id: bill.curr_bill_id,
      };

      update_bill_mutation.mutate(new_bill);
    }

    if (
      initBill.prev_elec !== input.prev_elec ||
      initBill.prev_water !== input.prev_water
    ) {
      const new_bill: PropertyBillsUpdate & { id: string } = {
        elec_readings: parseFloat(parseFloat(input.prev_elec).toFixed(2)),
        water_readings: parseFloat(parseFloat(input.prev_water).toFixed(2)),
        shop: bill.shop_id,
        month: parseInt(bill.prev_month),
        year: parseInt(bill.prev_year),
        id: bill.prev_bill_id,
      };

      update_bill_mutation.mutate(new_bill);
    }
    // setInput(genInitValues())
  }
  const form = useForm({
    defaultValues: initBill,
    onSubmit: async ({ value }) => {
      await handleSubmit(value);
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex w-full flex-wrap items-center justify-center gap-8"
      >
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <div className="flex w-full items-center justify-center gap-5 rounded-2xl bg-base-200">
            <PlusMinusYear
              value={formPeriod.year}
              setValue={(value) =>
                startTransition(() => {
                  setFormPeriod((prev) => {
                    return {
                      ...prev,
                      year: value,
                    };
                  });
                  navigate({
                    search: {
                      ...searchParams,
                      sy: value,
                    },
                  });
                })
              }
              maxYear={new Date().getFullYear() + 5}
              minYear={new Date().getFullYear() - 5}
            />
            /
            <PlusMinusMonth
              value={formPeriod.month}
              setValue={(value) =>
                startTransition(() => {
                  setFormPeriod((prev) => {
                    return {
                      ...prev,
                      month: value,
                    };
                  });
                  navigate({
                    search: {
                      ...searchParams,
                      sm: value,
                    },
                  });
                })
              }
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-5">
            {/* water */}
            <div className="flex min-w-[40%] flex-col items-center justify-center gap-3">
              <form.Field
                name="prev_water"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<BillsInput>
                      field={field}
                      fieldKey="prev_water"
                      fieldlabel="previous water"
                      inputOptions={{
                        onBlur: field.handleBlur,
                        type: "number",
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                  );
                }}
              />
              <form.Field
                name="curr_water"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<BillsInput>
                      field={field}
                      fieldKey="curr_water"
                      fieldlabel="current water"
                      inputOptions={{
                        onBlur: field.handleBlur,
                        type: "number",
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                  );
                }}
              />
              <form.Subscribe
                selector={(state) => [
                  state.values.curr_water,
                  state.values.prev_water,
                ]}
                children={([curr, prev]) => {
                  const diff =
                    parseFloat(curr ?? "1") - parseFloat(prev ?? "1");
                  const textColorClassName =
                    diff < 0 ? "text-error" : diff > 0 ? "text-success" : "";
                  return (
                    <div className={textColorClassName}>
                      {" "}
                      diff: {diff.toFixed(2)}
                    </div>
                  );
                }}
              />
            </div>
            {/*  elec */}
            <div className="flex min-w-[40%] flex-col items-center justify-center gap-3">
              <form.Field
                name="prev_elec"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<BillsInput>
                      field={field}
                      fieldKey="prev_elec"
                      fieldlabel="previous elec"
                      inputOptions={{
                        onBlur: field.handleBlur,
                        type: "number",
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                  );
                }}
              />
              <form.Field
                name="curr_elec"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<BillsInput>
                      field={field}
                      fieldKey="curr_elec"
                      fieldlabel="current elec"
                      inputOptions={{
                        onBlur: field.handleBlur,
                        type: "number",
                        onChange: (e) => field.handleChange(e.target.value),
                      }}
                    />
                  );
                }}
              />
              <form.Subscribe
                selector={(state) => [
                  state.values.curr_elec,
                  state.values.prev_elec,
                ]}
                children={([curr, prev]) => {
                  const diff =
                    parseFloat(curr ?? "1") - parseFloat(prev ?? "1");
                  const textColorClassName =
                    diff < 0 ? "text-error" : diff > 0 ? "text-success" : "";
                  return (
                    <div className={textColorClassName}>
                      {" "}
                      diff: {diff.toFixed(2)}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>

        {new_bill_mutation.isError && (
          <ErrorWrapper err={new_bill_mutation.error} />
        )}
        {update_bill_mutation.isError && (
          <ErrorWrapper err={update_bill_mutation.error} />
        )}

        {is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr" ? (
          <button
            disabled={new_bill_mutation.isPending}
            className="btn btn-outline btn-wide"
          >
            Create{" "}
            {new_bill_mutation.isPending && (
              <Loader className="h-4 w-4 animate-spin" />
            )}
          </button>
        ) : (
          <button
            disabled={update_bill_mutation.isPending}
            className="btn btn-outline btn-wide"
          >
            Update{" "}
            {update_bill_mutation.isPending && (
              <Loader className="h-4 w-4 animate-spin" />
            )}
          </button>
        )}
      </form>
    </div>
  );
}
