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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Plus } from "lucide-react";
import { startTransition, useState } from "react";

import { PropertyFloorPrefixes } from "./floors";
import { ShopNumberInput } from "./ShopNumberInput";
import {
  PropertyShopsCreate,
  PropertyTenantsListResponse,
} from "@/lib/pb/pb-types";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/PBTheTextInput";
import { makeHotToast } from "@/components/toasters";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { PBCheckbox } from "./PBCheckbox";

type PropertyTenantsExpand = Pick<PropertyTenantsListResponse, "id" | "name">;
interface CreateShopProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateShop({ setOpen }: CreateShopProps) {
  const collectionName: CollectionName = "property_shops";
  const [tenant, setTenant] = useState<PropertyTenantsExpand[] | undefined>([]);

  const { input, handleChange, setInput } = useFormHook<
    PropertyShopsCreate & { floor: PropertyFloorPrefixes }
  >({
    initialValues: {
      shop_number: "",
      floor: "G",
      is_vacant: false,
      order: 0,
      tenant: "",
      utils: "none",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: PropertyShopsCreate) => {
      return pb.from(collectionName).create(data);
    },
    meta: { invalidates: [collectionName] },
    onSuccess: (data) => {
      makeHotToast({
        title: "New Shop added",
        description: `Shop Number: ${data.shop_number}`,
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
        <ShopNumberInput input={input} setInput={setInput} />
        <PbTheTextInput<typeof input>
          field_key={"shop_number"}
          field_name={"Shop Number"}
          onChange={handleChange}
          val={input.shop_number}
          pb_error={pb_error}
        />

        <PBCheckbox
          fieldKey={"is_vacant"}
          fieldLabel={"Is vacant?"}
          input={input}
          setInput={setInput}
        />
        <div className="flex w-full flex-col items-center justify-center">
          <Select
            onValueChange={(v: PropertyFloorPrefixes) =>
              startTransition(() =>
                setInput((prev) => ({
                  ...prev,
                  utils: v as (typeof input)["utils"],
                })),
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="What utility?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Utils</SelectLabel>
                <SelectItem value={"both"}>both</SelectItem>
                <SelectItem value={"none"}>none</SelectItem>
                <SelectItem value={"elec"}>elec</SelectItem>
                <SelectItem value={"water"}>water</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <PBPickRelationField<PropertyTenantsExpand>
          dialogTrigger={
            <span className="btn btn-outline btn-sm">Pick tenant</span>
          }
          selectedRows={tenant}
          maxSelected={1}
          setSelectedRows={(itm) => {
            if (Array.isArray(itm)) {
              setTenant(itm as any);
              setInput((prev) => ({ ...prev, tenant: itm.at(-1)?.id ?? "" }));
            }
          }}
          collectionName="property_tenants_list"
          columns={{
            name: {
              name: "tenant",
            },
          }}
          fieldLabel="Tenant"
          searchParamKey="ths"
          filterBy="name"
        />
        <div className="flex w-full items-center justify-center">
          <MutationButton mutation={mutation} />
        </div>
      </form>
    </div>
  );
}

interface CreateShopModalProps {
  trigger?: React.ReactNode;
}
export function CreateShopModal({ trigger }: CreateShopModalProps) {
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
          <DialogTitle>Create Shop</DialogTitle>
          <DialogDescription>Add new shop </DialogDescription>
        </DialogHeader>

        <div className="h-full w-full">
          <CreateShop setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
