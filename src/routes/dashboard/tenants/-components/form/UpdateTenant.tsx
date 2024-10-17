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
import { Edit } from "lucide-react";
import {
  PropertyShopsResponse,
  PropertyTenantsListCreate,
  PropertyTenantsListUpdate,
  PropertyUserResponse,
} from "@/lib/pb/database";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/PBTheTextInput";
import { makeHotToast } from "@/components/toasters";
import { useState } from "react";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";

type PropertyTenantsExpand = Pick<PropertyUserResponse, "id" | "username">;
interface UpdateTenantProps {
  item: PropertyTenantsListUpdate & {
    id: string;
    expand?: {
      "property_shops(tenant)"?: PropertyShopsResponse[] | undefined;
      account?: PropertyUserResponse | undefined;
    };
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateTenant({ item, setOpen }: UpdateTenantProps) {
  const collectionName: CollectionName = "property_tenants_list";
  const [relation, setRelation] = useState<PropertyTenantsExpand[] | undefined>(
    [],
  );

  const { input, handleChange, setInput } =
    useFormHook<PropertyTenantsListCreate>({
      initialValues: {
        name: item.name ?? "",
        account: item.account ?? "",
      },
    });
  const mutation = useMutation({
    mutationFn: (data: PropertyTenantsListUpdate) => {
      return pb.from(collectionName).update(item.id, data);
    },
    meta: { invalidates: [collectionName] },
    onSuccess: (data) => {
      makeHotToast({
        title: "Tenant updated",
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
  const currentTenant = item.expand?.account;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("input", input);
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
            <span className="btn btn-outline btn-sm">
              {relation?.[0]?.username ? currentTenant?.username :<div>link an account</div>}
              <Edit className="size-3" />
            </span>
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
          fieldLabel="Account"
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

interface UpdateTenantModalProps {
  item: PropertyTenantsListUpdate & {
    id: string;
    expand?: {
      "property_shops(tenant)"?: PropertyShopsResponse[] | undefined;
      account?: PropertyUserResponse | undefined;
    };
  };
  trigger?: React.ReactNode;
}
export function UpdateTenantModal({ item, trigger }: UpdateTenantModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="flex items-center justify-center"
      >
        {trigger ?? <Edit className="size-5" />}
      </DialogTrigger>
      <DialogContent className="min-h-[30%]overflow-auto w-fit min-w-[80%] sm:max-w-[80%] md:min-w-[60%] lg:min-w-[40%]">
        <DialogHeader>
          <DialogTitle>Update tenant</DialogTitle>
          <DialogDescription>Update tenant </DialogDescription>
        </DialogHeader>

        <div className="h-full w-full">
          <UpdateTenant setOpen={setOpen} item={item} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
