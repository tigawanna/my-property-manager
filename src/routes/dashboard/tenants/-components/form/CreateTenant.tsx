import { pb, type CollectionName } from "@/lib/pb/client";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  PropertyTenantsListCreate,
  PropertyUserResponse,
} from "@/lib/pb/pb-types";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/PBTheTextInput";
import { makeHotToast } from "@/components/toasters";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";

type PropertyTenantsExpand = Pick<PropertyUserResponse, "id" | "username">;
interface CreateTenantProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateTenant({ setOpen }: CreateTenantProps) {
  const collectionName: CollectionName = "property_tenants_list";
  const [relation, setRelation] = useState<PropertyTenantsExpand[] | undefined>(
    [],
  );

  const { input, handleChange, setInput } =
    useFormHook<PropertyTenantsListCreate>({
      initialValues: {
        account: "",
        name: "",
      },
    });

  const mutation = useMutation({
    mutationFn: (data: PropertyTenantsListCreate) => {
      return pb.from(collectionName).create(data);
    },
    meta: { invalidates: [collectionName] },
    onSuccess: (data) => {
      makeHotToast({
        title: "New tenant added",
        description: `Tenant Name: ${data.name}`,
        variant: "success",
        duration: 2000,
      });

      setOpen(false);
    },
    onError: (error: any) => {
      makeHotToast({
        title: "Something went wrong",
        description: `${error.message}`,
        variant: "error",
        duration: 20000,
      });
    },
  });
  const pb_error = mutation?.error;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form className="flex size-full flex-col gap-5" onSubmit={handleSubmit}>
        <PbTheTextInput<typeof input>
          field_key={"name"}
          field_name={"Tenant name"}
          onChange={handleChange}
          val={input.name}
          pb_error={pb_error}
        />

        <PBPickRelationField<PropertyTenantsExpand>
          dialogTrigger={
            <span className="btn btn-outline btn-sm">Pick tenant account</span>
          }
          selectedRows={relation}
          maxSelected={1}
          setSelectedRows={(itm) => {
            if (Array.isArray(itm)) {
              setRelation(itm as any);
              setInput((prev) => ({ ...prev, account: itm.at(-1)?.id ?? "" }));
            }
          }}
          collectionName="property_user"
          columns={{
            username: {
              name: "account",
            },
          }}
          fieldLabel="Tenant"
          searchParamKey="ths"
          filterBy="username"
        />
        <div className="flex w-full items-center justify-center">
          <MutationButton mutation={mutation} />
        </div>
      </form>
    </div>
  );
}

interface CreateTenantModalProps {
  trigger?: React.ReactNode;
}
export function CreateTenantModal({ trigger }: CreateTenantModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="flex size-full items-center justify-center"
      >
        {trigger ?? <Plus className="size-9" />}
      </DialogTrigger>
      <DialogContent className="min-h-[30%]overflow-auto w-fit min-w-[80%] sm:max-w-[80%] md:min-w-[60%] lg:min-w-[40%]">
        <DialogHeader>
          <DialogTitle>Create Tenant</DialogTitle>
          <DialogDescription>Add new Tenant </DialogDescription>
        </DialogHeader>

        <div className="h-full w-full">
          <CreateTenant setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
