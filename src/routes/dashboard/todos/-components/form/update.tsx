

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Edit } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseTodosForm } from "./base";
import { useMutation } from "@tanstack/react-query";

interface UpdateTodosformInterface {
  item: Record<string, any> & { id: string };
}
export function UpdateTodosform({ item }: UpdateTodosformInterface) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (value: {}) => {
      return new Promise<{}>((resolve) => {
        setTimeout(() => {
          resolve(value);
        }, 2000);
      });
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
      invalidates: ["todos"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Update Todos"
      description="Update Todos"
      trigger={<Edit className="size-5" />}
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <BaseTodosForm mutation={mutation} row={item} />
      </div>
    </DiaDrawer>
  );
}


 