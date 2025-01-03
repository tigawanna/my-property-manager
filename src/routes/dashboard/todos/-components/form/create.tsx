

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseTodosForm } from "./base";
import { useMutation } from "@tanstack/react-query";
import { pb } from "@/lib/pb/client";
import { PropertyTodosCreate } from "@/lib/pb/pb-types";

export function CreateTodosForm() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value: PropertyTodosCreate) => {
      return pb.from("property_todos").create(value);
    },
    onSuccess: () => {
      makeHotToast({
        title: "Todos added",
        description: "Todos has been added successfully",
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
      invalidates: ["property_todos"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Add Todos"
      description="Add new Todos"
      trigger={
        <button className="btn btn-outline btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <BaseTodosForm mutation={mutation}  />
      </div>
    </DiaDrawer>
  );
}

 
 