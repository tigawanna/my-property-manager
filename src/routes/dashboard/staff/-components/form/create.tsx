import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseStaffForm } from "./base";
import { useMutation } from "@tanstack/react-query";

export function CreateStaffForm() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value: {}) => {
      return new Promise<{}>((resolve, reject) => {
        setTimeout(() => {
          resolve(value);
        }, 2000);
      });
    },
    onSuccess: () => {
      makeHotToast({
        title: "Staff added",
        description: "Staff has been added successfully",
        variant: "success",
      });
      setOpen(false);
    },
    onError(error) {
      makeHotToast({
        title: "Something went wrong",
        description: error.message,
        variant: "error",
      });
    },
    meta: {
      invalidates: ["property_shops_payments"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Add Staff"
      description="Add new staff"
      trigger={
        <button className="btn btn-outline btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }
    >
      <div className="flex h-full max-h-[80vh] w-fit flex-col gap-2 overflow-auto">
        <BaseStaffForm mutation={mutation} row={{}} />
      </div>
    </DiaDrawer>
  );
}
